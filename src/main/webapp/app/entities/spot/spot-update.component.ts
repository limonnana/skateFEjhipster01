import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISpot, Spot } from 'app/shared/model/spot.model';
import { SpotService } from './spot.service';

@Component({
  selector: 'jhi-spot-update',
  templateUrl: './spot-update.component.html',
})
export class SpotUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    imgPath: [],
    description: [],
  });

  constructor(protected spotService: SpotService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ spot }) => {
      this.updateForm(spot);
    });
  }

  updateForm(spot: ISpot): void {
    this.editForm.patchValue({
      id: spot.id,
      name: spot.name,
      description: spot.description,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const spot = this.createFromForm();
    if (spot.id !== undefined) {
      this.subscribeToSaveResponse(this.spotService.update(spot));
    } else {
      this.subscribeToSaveResponse(this.spotService.create(spot));
    }
  }

  private createFromForm(): ISpot {
    return {
      ...new Spot(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISpot>>): void {
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
}
