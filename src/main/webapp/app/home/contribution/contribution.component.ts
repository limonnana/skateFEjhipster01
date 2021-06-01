import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EventService } from 'app/entities/event/event.service';
import { IEvent } from 'app/shared/model/event.model';
import { IContributionForm, ContributionForm } from './contribution.form';
import { ContributionService } from './contribution.service';
import { ITrick } from 'app/shared/model/trick.model';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

type EntityResponseType = HttpResponse<EntityResponseType>;

@Component({
  selector: 'jhi-contribution',
  templateUrl: './contribution.component.html',
  styleUrls: ['./contribution.component.scss'],
})
export class ContributionComponent implements OnInit {
  event?: IEvent | undefined;
  tricks?: ITrick[];
  users: IUser[] = [];
  isSaving = false;
  selectedOption?: IUser;
  userId?: string;

  contributionForm = this.fb.group({
    amount: [],
    userId: [],
    user: [],
    trick: [],
    phone: [],
  });

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private userService: UserService,
    private contributionService: ContributionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventService.getActive().subscribe((res: HttpResponse<IEvent>) => {
      this.event = res.body || undefined;
      this.tricks = this.event?.tricks;
      this.updateForm(this.event!);
    });
    this.loadAll();
  }

  updateForm(event: IEvent): void {
    this.contributionForm.patchValue({
      tricks: event.tricks,
    });
  }

  loadAll(): void {
    this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
    if (this.selectedOption != null) {
      this.userId = this.selectedOption.id;
      this.contributionForm.patchValue({
        phone: this.selectedOption.phone,
      });
    }
  }

  private createFromForm(): IContributionForm {
    return {
      ...new ContributionForm(),
      amount: this.contributionForm.get(['amount'])!.value,
      trick: this.contributionForm.get(['trick'])!.value,
      userId: this.userId,
      phone: this.contributionForm.get(['phone'])!.value,
      userFullName: this.contributionForm.get(['user'])!.value,
    };
  }

  save(): void {
    this.isSaving = true;

    const contributionForm = this.createFromForm();

    this.subscribeToSaveResponse(this.contributionService.create(contributionForm));
  }

  trackById(index: number, item: ITrick): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<EntityResponseType>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.router.navigate(['home']);
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  previousState(): void {
    window.history.back();
  }
}
