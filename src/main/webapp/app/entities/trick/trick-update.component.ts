import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITrick, Trick } from 'app/shared/model/trick.model';
import { TrickService } from './trick.service';

@Component({
  selector: 'jhi-trick-update',
  templateUrl: './trick-update.component.html',
})
export class TrickUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    objectiveAmount: [],
    currentAmount: [],
  });

  constructor(protected trickService: TrickService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ trick }) => {
      this.updateForm(trick);
    });
  }

  updateForm(trick: ITrick): void {
    this.editForm.patchValue({
      id: trick.id,
      name: trick.name,
      objectiveAmount: trick.objectiveAmount,
      currentAmount: trick.currentAmount,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const trick = this.createFromForm();
    if (trick.id !== undefined) {
      this.subscribeToSaveResponse(this.trickService.update(trick));
    } else {
      this.subscribeToSaveResponse(this.trickService.create(trick));
    }
  }

  private createFromForm(): ITrick {
    return {
      ...new Trick(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      objectiveAmount: this.editForm.get(['objectiveAmount'])!.value,
      currentAmount: this.editForm.get(['currentAmount'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITrick>>): void {
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
