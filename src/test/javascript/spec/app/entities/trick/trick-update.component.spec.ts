import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterFrontEndTestModule } from '../../../test.module';
import { TrickUpdateComponent } from 'app/entities/trick/trick-update.component';
import { TrickService } from 'app/entities/trick/trick.service';
import { Trick } from 'app/shared/model/trick.model';

describe('Component Tests', () => {
  describe('Trick Management Update Component', () => {
    let comp: TrickUpdateComponent;
    let fixture: ComponentFixture<TrickUpdateComponent>;
    let service: TrickService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterFrontEndTestModule],
        declarations: [TrickUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TrickUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TrickUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TrickService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Trick('123');
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
        const entity = new Trick();
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
