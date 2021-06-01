import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISpot } from 'app/shared/model/spot.model';
import { SpotService } from './spot.service';

@Component({
  templateUrl: './spot-delete-dialog.component.html',
})
export class SpotDeleteDialogComponent {
  spot?: ISpot;

  constructor(protected spotService: SpotService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.spotService.delete(id).subscribe(() => {
      this.eventManager.broadcast('spotListModification');
      this.activeModal.close();
    });
  }
}
