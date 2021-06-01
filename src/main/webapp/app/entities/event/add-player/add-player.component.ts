import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../player/player.service';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { IEvent } from 'app/shared/model/event.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AddPlayer } from 'app/shared/model/addPlayer.model';
import { Observable } from 'rxjs';
import { EventService } from '../event.service';
import { IPlayer } from 'app/shared/model/player.model';

export interface IAddPlayerForm {
  idEvent?: string;
  player?: IPlayer;
}

export class AddPlayerForm {
  idEvent?: string;
  player?: IPlayer;
}

@Component({
  selector: 'jhi-add-player',
  templateUrl: './add-player.component.html',
})
export class AddPlayerComponent implements OnInit {
  players?: IPlayer[];
  isSaving = false;
  event?: IEvent;

  addPlayerForm = this.fb.group({
    id: [],
    player: [],
  });

  constructor(
    protected playerService: PlayerService,
    protected eventService: EventService,
    private fb: FormBuilder,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ event }) => {
      this.updateForm(event);
      this.event = event;
      this.playerService
        .query({ filter: 'event-is-null' })
        .pipe(
          map((res: HttpResponse<IPlayer[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPlayer[]) => {
          if (!event.player || !event.player.id) {
            this.players = resBody;
          } else {
            this.playerService
              .find(event.player.id)
              .pipe(
                map((subRes: HttpResponse<IPlayer>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPlayer[]) => (this.players = concatRes));
          }
        });
    });
  }

  loadAll(): void {
    this.playerService.query().subscribe((res: HttpResponse<IPlayer[]>) => (this.players = res.body || []));
  }

  previousState(): void {
    window.history.back();
  }

  updateForm(event: IEvent): void {
    this.addPlayerForm.patchValue({
      id: event.id,
    });
  }

  private createFromForm(): IAddPlayerForm {
    return {
      ...new AddPlayerForm(),
      idEvent: this.addPlayerForm.get(['id'])!.value,
      player: this.addPlayerForm.get(['player'])!.value,
    };
  }

  save(): void {
    this.isSaving = true;
    const IAddPlayerForm = this.createFromForm();
    const addPlayer = new AddPlayer(IAddPlayerForm.idEvent, IAddPlayerForm.player?.id);
    this.subscribeToSaveResponse(this.eventService.addPlayer(addPlayer));
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

  trackById(index: number, item: IPlayer): any {
    return item.id;
  }
}
