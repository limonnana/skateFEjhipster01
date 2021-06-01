import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterFrontEndTestModule } from '../../../test.module';
import { FanUpdateComponent } from 'app/entities/fan/fan-update.component';
import { FanService } from 'app/entities/fan/fan.service';
import { Fan } from 'app/shared/model/fan.model';

describe('Component Tests', () => {
  describe('Fan Management Update Component', () => {
    let comp: FanUpdateComponent;
    let fixture: ComponentFixture<FanUpdateComponent>;
    let service: FanService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterFrontEndTestModule],
        declarations: [FanUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(FanUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FanUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FanService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Fan('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Fan();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
