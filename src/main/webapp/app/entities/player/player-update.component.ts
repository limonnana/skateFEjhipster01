import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPlayer } from 'app/shared/model/player.model';
import { PlayerService } from './player.service';
import { IUserDTO, UserDTO } from 'app/shared/model/userDTO.model';
import { IEvent } from 'app/shared/model/event.model';
import { EventService } from '../event/event.service';

@Component({
  selector: 'jhi-player-update',
  templateUrl: './player-update.component.html',
})
export class PlayerUpdateComponent implements OnInit {
  isSaving = false;
  events?: IEvent[];
  isNotEditing = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    lastName: [],
    email: [],
    phone: [null, [Validators.required]],
    country: [],
    event: [],
  });

  constructor(
    protected playerService: PlayerService,
    protected eventService: EventService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ player }) => {
      if (player === null || player === undefined || player?.id === null || player?.id === undefined) {
        this.isNotEditing = true;
      }
      this.updateForm(player);
    });
    this.loadAllEvents();
  }

  loadAllEvents(): void {
    this.eventService.query().subscribe((res: HttpResponse<IEvent[]>) => (this.events = res.body || []));
  }

  updateForm(player: IPlayer): void {
    this.editForm.patchValue({
      id: player.id,
      name: player.user?.firstName,
      lastName: player.user?.lastName,
      email: player.user?.email,
      phone: player.user?.phone,
      country: player.user?.country,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userDTO = this.createFromForm();
    if (userDTO.id !== undefined) {
      this.subscribeToSaveResponse(this.playerService.update(userDTO));
    } else {
      this.subscribeToSaveResponse(this.playerService.create(userDTO));
    }
  }

  private createFromForm(): IUserDTO {
    return {
      ...new UserDTO(),
      id: this.editForm.get(['id'])!.value,
      login: this.editForm.get(['phone'])!.value,
      firstName: this.editForm.get(['name'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      email: this.editForm.get(['email'])!.value,
      phone: this.editForm.get(['phone'])!.value,
      country: this.editForm.get(['country'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlayer>>): void {
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

  trackById(index: number, item: IEvent): any {
    return item.id;
  }
}
