import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterFrontEndTestModule } from '../../../test.module';
import { FanComponent } from 'app/entities/fan/fan.component';
import { FanService } from 'app/entities/fan/fan.service';
import { Fan } from 'app/shared/model/fan.model';

describe('Component Tests', () => {
  describe('Fan Management Component', () => {
    let comp: FanComponent;
    let fixture: ComponentFixture<FanComponent>;
    let service: FanService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterFrontEndTestModule],
        declarations: [FanComponent],
      })
        .overrideTemplate(FanComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FanComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FanService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Fan('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.fans && comp.fans[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
