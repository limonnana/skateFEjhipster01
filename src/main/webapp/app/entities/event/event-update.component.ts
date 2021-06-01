import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IEvent, Event } from 'app/shared/model/event.model';
import { EventService } from './event.service';
import { ISpot } from 'app/shared/model/spot.model';
import { SpotService } from 'app/entities/spot/spot.service';

@Component({
  selector: 'jhi-event-update',
  templateUrl: './event-update.component.html',
})
export class EventUpdateComponent implements OnInit {
  isSaving = false;
  spots: ISpot[] = [];
  dayDp: any;

  editForm = this.fb.group({
    id: [],
    day: [],
    dayString: [],
    name: [],
    spot: [],
    active: [],
  });

  constructor(
    protected eventService: EventService,
    protected spotService: SpotService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ event }) => {
      this.updateForm(event);

      this.spotService
        .query({ filter: 'event-is-null' })
        .pipe(
          map((res: HttpResponse<ISpot[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ISpot[]) => {
          if (!event.spot || !event.spot.id) {
            this.spots = resBody;
          } else {
            this.spotService
              .find(event.spot.id)
              .pipe(
                map((subRes: HttpResponse<ISpot>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ISpot[]) => (this.spots = concatRes));
          }
        });
    });
  }

  updateForm(event: IEvent): void {
    this.editForm.patchValue({
      id: event.id,
      day: event.day,
      dayString: event.dayString,
      name: event.name,
      spot: event.spot,
      active: event.active,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const event = this.createFromForm();
    if (event.id !== undefined) {
      this.subscribeToSaveResponse(this.eventService.update(event));
    } else {
      this.subscribeToSaveResponse(this.eventService.create(event));
    }
  }

  private createFromForm(): IEvent {
    return {
      ...new Event(),
      id: this.editForm.get(['id'])!.value,
      day: this.editForm.get(['day'])!.value,
      dayString: this.editForm.get(['dayString'])!.value,
      name: this.editForm.get(['name'])!.value,
      spot: this.editForm.get(['spot'])!.value,
      active: this.editForm.get(['active'])!.value,
    };
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

  trackById(index: number, item: ISpot): any {
    return item.id;
  }
}
