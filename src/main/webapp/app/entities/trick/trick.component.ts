import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITrick } from 'app/shared/model/trick.model';
import { TrickService } from './trick.service';
import { TrickDeleteDialogComponent } from './trick-delete-dialog.component';

@Component({
  selector: 'jhi-trick',
  templateUrl: './trick.component.html',
})
export class TrickComponent implements OnInit, OnDestroy {
  tricks?: ITrick[];
  eventSubscriber?: Subscription;

  constructor(protected trickService: TrickService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.trickService.query().subscribe((res: HttpResponse<ITrick[]>) => (this.tricks = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTricks();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITrick): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTricks(): void {
    this.eventSubscriber = this.eventManager.subscribe('trickListModification', () => this.loadAll());
  }

  delete(trick: ITrick): void {
    const modalRef = this.modalService.open(TrickDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.trick = trick;
  }
}
