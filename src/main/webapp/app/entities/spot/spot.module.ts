import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterFrontEndSharedModule } from 'app/shared/shared.module';
import { SpotComponent } from './spot.component';
import { SpotDetailComponent } from './spot-detail.component';
import { SpotUpdateComponent } from './spot-update.component';
import { SpotDeleteDialogComponent } from './spot-delete-dialog.component';
import { spotRoute } from './spot.route';
import { AddImageToSpotComponent } from './add-image-to-spot/add-image-to-spot.component';

@NgModule({
  imports: [JhipsterFrontEndSharedModule, RouterModule.forChild(spotRoute)],
  declarations: [SpotComponent, SpotDetailComponent, SpotUpdateComponent, SpotDeleteDialogComponent, AddImageToSpotComponent],
  entryComponents: [SpotDeleteDialogComponent],
})
export class JhipsterFrontEndSpotModule {}
