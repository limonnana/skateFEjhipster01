import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterFrontEndTestModule } from '../../../test.module';
import { TrickDetailComponent } from 'app/entities/trick/trick-detail.component';
import { Trick } from 'app/shared/model/trick.model';

describe('Component Tests', () => {
  describe('Trick Management Detail Component', () => {
    let comp: TrickDetailComponent;
    let fixture: ComponentFixture<TrickDetailComponent>;
    const route = ({ data: of({ trick: new Trick('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterFrontEndTestModule],
        declarations: [TrickDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TrickDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TrickDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load trick on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.trick).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
