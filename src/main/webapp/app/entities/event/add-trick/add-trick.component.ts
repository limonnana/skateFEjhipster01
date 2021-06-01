import { Component, OnInit } from '@angular/core';
import { ITrick } from 'app/shared/model/trick.model';
import { TrickService } from '../../trick/trick.service';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { IEvent } from 'app/shared/model/event.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AddTrick } from 'app/shared/model/addTrick.model';
import { Observable } from 'rxjs';
import { EventService } from '../event.service';

export interface IAddTrickForm {
  idEvent?: string;
  trick?: ITrick;
}

export class AddTrickForm {
  idEvent?: string;
  trick?: ITrick;
}

@Component({
  selector: 'jhi-add-trick',
  templateUrl: './add-trick.component.html',
})
export class AddTrickComponent implements OnInit {
  tricks?: ITrick[];
  isSaving = false;

  addTrickForm = this.fb.group({
    id: [],
    trick: [],
  });

  constructor(
    protected trickService: TrickService,
    protected eventService: EventService,
    private fb: FormBuilder,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ event }) => {
      this.updateForm(event);

      this.trickService
        .query({ filter: 'event-is-null' })
        .pipe(
          map((res: HttpResponse<ITrick[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ITrick[]) => {
          if (!event.trick || !event.trick.id) {
            this.tricks = resBody;
          } else {
            this.trickService
              .find(event.trick.id)
              .pipe(
                map((subRes: HttpResponse<ITrick>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ITrick[]) => (this.tricks = concatRes));
          }
        });
    });
  }

  loadAll(): void {
    this.trickService.query().subscribe((res: HttpResponse<ITrick[]>) => (this.tricks = res.body || []));
  }

  previousState(): void {
    window.history.back();
  }

  updateForm(event: IEvent): void {
    this.addTrickForm.patchValue({
      id: event.id,
    });
  }

  private createFromForm(): IAddTrickForm {
    return {
      ...new AddTrickForm(),
      idEvent: this.addTrickForm.get(['id'])!.value,
      trick: this.addTrickForm.get(['trick'])!.value,
    };
  }

  save(): void {
    this.isSaving = true;
    const IAddTrickForm = this.createFromForm();
    const addTrick = new AddTrick(IAddTrickForm.idEvent, IAddTrickForm.trick?.id);
    this.subscribeToSaveResponse(this.eventService.addTrick(addTrick));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEvent>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ITrick): any {
    return item.id;
  }
}
