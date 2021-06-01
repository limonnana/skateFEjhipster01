import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterFrontEndSharedModule } from 'app/shared/shared.module';
import { EventComponent } from './event.component';
import { EventDetailComponent } from './event-detail.component';
import { EventUpdateComponent } from './event-update.component';
import { EventDeleteDialogComponent } from './event-delete-dialog.component';
import { eventRoute } from './event.route';
import { AddTrickComponent } from './add-trick/add-trick.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { AddImageComponent } from './add-image/add-image.component';

@NgModule({
  imports: [JhipsterFrontEndSharedModule, RouterModule.forChild(eventRoute)],
  declarations: [
    EventComponent,
    EventDetailComponent,
    EventUpdateComponent,
    EventDeleteDialogComponent,
    AddTrickComponent,
    AddPlayerComponent,
    AddImageComponent,
  ],
  entryComponents: [EventDeleteDialogComponent],
})
export class JhipsterFrontEndEventModule {}
