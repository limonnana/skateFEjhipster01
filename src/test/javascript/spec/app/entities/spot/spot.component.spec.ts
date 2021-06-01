import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterFrontEndTestModule } from '../../../test.module';
import { SpotComponent } from 'app/entities/spot/spot.component';
import { SpotService } from 'app/entities/spot/spot.service';
import { Spot } from 'app/shared/model/spot.model';

describe('Component Tests', () => {
  describe('Spot Management Component', () => {
    let comp: SpotComponent;
    let fixture: ComponentFixture<SpotComponent>;
    let service: SpotService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterFrontEndTestModule],
        declarations: [SpotComponent],
      })
        .overrideTemplate(SpotComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SpotComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SpotService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Spot('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.spots && comp.spots[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
