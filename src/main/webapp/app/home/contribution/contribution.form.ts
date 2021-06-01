import { ITrick } from 'app/shared/model/trick.model';

export interface IContributionForm {
  amount?: string;
  trick?: ITrick;
  userId?: string;
  userFullName?: string;
  phone?: string;
}

export class ContributionForm implements IContributionForm {
  constructor(public amount?: string, public trick?: ITrick, public userId?: string, public fanFullName?: string, public phone?: string) {}
}
