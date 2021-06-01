import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterFrontEndTestModule } from '../../../test.module';
import { FanDetailComponent } from 'app/entities/fan/fan-detail.component';
import { Fan } from 'app/shared/model/fan.model';

describe('Component Tests', () => {
  describe('Fan Management Detail Component', () => {
    let comp: FanDetailComponent;
    let fixture: ComponentFixture<FanDetailComponent>;
    const route = ({ data: of({ fan: new Fan('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterFrontEndTestModule],
        declarations: [FanDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(FanDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FanDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load fan on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.fan).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
