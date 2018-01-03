/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ManaProjectTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TnDescDetailComponent } from '../../../../../../main/webapp/app/entities/tn-desc/tn-desc-detail.component';
import { TnDescService } from '../../../../../../main/webapp/app/entities/tn-desc/tn-desc.service';
import { TnDesc } from '../../../../../../main/webapp/app/entities/tn-desc/tn-desc.model';

describe('Component Tests', () => {

    describe('TnDesc Management Detail Component', () => {
        let comp: TnDescDetailComponent;
        let fixture: ComponentFixture<TnDescDetailComponent>;
        let service: TnDescService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ManaProjectTestModule],
                declarations: [TnDescDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TnDescService,
                    JhiEventManager
                ]
            }).overrideTemplate(TnDescDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TnDescDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TnDescService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TnDesc(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tnDesc).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
