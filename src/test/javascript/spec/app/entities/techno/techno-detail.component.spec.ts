/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ManaProjectTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TechnoDetailComponent } from '../../../../../../main/webapp/app/entities/techno/techno-detail.component';
import { TechnoService } from '../../../../../../main/webapp/app/entities/techno/techno.service';
import { Techno } from '../../../../../../main/webapp/app/entities/techno/techno.model';

describe('Component Tests', () => {

    describe('Techno Management Detail Component', () => {
        let comp: TechnoDetailComponent;
        let fixture: ComponentFixture<TechnoDetailComponent>;
        let service: TechnoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ManaProjectTestModule],
                declarations: [TechnoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TechnoService,
                    JhiEventManager
                ]
            }).overrideTemplate(TechnoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TechnoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TechnoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Techno(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.techno).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
