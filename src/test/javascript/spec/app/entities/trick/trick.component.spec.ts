import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterFrontEndTestModule } from '../../../test.module';
import { TrickComponent } from 'app/entities/trick/trick.component';
import { TrickService } from 'app/entities/trick/trick.service';
import { Trick } from 'app/shared/model/trick.model';

describe('Component Tests', () => {
  describe('Trick Management Component', () => {
    let comp: TrickComponent;
    let fixture: ComponentFixture<TrickComponent>;
    let service: TrickService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterFrontEndTestModule],
        declarations: [TrickComponent],
      })
        .overrideTemplate(TrickComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TrickComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TrickService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Trick('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tricks && comp.tricks[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
