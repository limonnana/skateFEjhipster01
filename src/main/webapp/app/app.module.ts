import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { JhipsterFrontEndSharedModule } from 'app/shared/shared.module';
import { JhipsterFrontEndCoreModule } from 'app/core/core.module';
import { JhipsterFrontEndAppRoutingModule } from './app-routing.module';
import { JhipsterFrontEndHomeModule } from './home/home.module';
import { JhipsterFrontEndEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    JhipsterFrontEndSharedModule,
    JhipsterFrontEndCoreModule,
    JhipsterFrontEndHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    JhipsterFrontEndEntityModule,
    JhipsterFrontEndAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class JhipsterFrontEndAppModule {}
