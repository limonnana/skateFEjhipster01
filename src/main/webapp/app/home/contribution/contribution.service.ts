import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../../app.constants';
import { IContributionForm } from './contribution.form';

type EntityResponseType = HttpResponse<EntityResponseType>;
type EntityArrayResponseType = HttpResponse<EntityResponseType[]>;

@Injectable({ providedIn: 'root' })
export class ContributionService {
  public resourceUrl = SERVER_API_URL + 'api/users';

  constructor(protected http: HttpClient) {}

  create(contributionForm: IContributionForm): Observable<EntityResponseType> {
    return this.http.post<EntityResponseType>(`${this.resourceUrl}/contribution`, contributionForm, { observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
