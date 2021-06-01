import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISpot } from 'app/shared/model/spot.model';
import { SpotService } from './spot.service';
import { SpotDeleteDialogComponent } from './spot-delete-dialog.component';

@Component({
  selector: 'jhi-spot',
  templateUrl: './spot.component.html',
})
export class SpotComponent implements OnInit, OnDestroy {
  spots?: ISpot[];
  eventSubscriber?: Subscription;

  constructor(protected spotService: SpotService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.spotService.query().subscribe((res: HttpResponse<ISpot[]>) => (this.spots = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSpots();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISpot): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSpots(): void {
    this.eventSubscriber = this.eventManager.subscribe('spotListModification', () => this.loadAll());
  }

  delete(spot: ISpot): void {
    const modalRef = this.modalService.open(SpotDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.spot = spot;
  }
}
