import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITrick } from 'app/shared/model/trick.model';
import { TrickService } from './trick.service';

@Component({
  templateUrl: './trick-delete-dialog.component.html',
})
export class TrickDeleteDialogComponent {
  trick?: ITrick;

  constructor(protected trickService: TrickService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.trickService.delete(id).subscribe(() => {
      this.eventManager.broadcast('trickListModification');
      this.activeModal.close();
    });
  }
}
