import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITrick } from 'app/shared/model/trick.model';

type EntityResponseType = HttpResponse<ITrick>;
type EntityArrayResponseType = HttpResponse<ITrick[]>;

@Injectable({ providedIn: 'root' })
export class TrickService {
  public resourceUrl = SERVER_API_URL + 'api/tricks';

  constructor(protected http: HttpClient) {}

  create(trick: ITrick): Observable<EntityResponseType> {
    return this.http.post<ITrick>(this.resourceUrl, trick, { observe: 'response' });
  }

  update(trick: ITrick): Observable<EntityResponseType> {
    return this.http.put<ITrick>(this.resourceUrl, trick, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ITrick>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITrick[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
