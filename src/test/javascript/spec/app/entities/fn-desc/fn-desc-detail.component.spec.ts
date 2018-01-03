/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ManaProjectTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FnDescDetailComponent } from '../../../../../../main/webapp/app/entities/fn-desc/fn-desc-detail.component';
import { FnDescService } from '../../../../../../main/webapp/app/entities/fn-desc/fn-desc.service';
import { FnDesc } from '../../../../../../main/webapp/app/entities/fn-desc/fn-desc.model';

describe('Component Tests', () => {

    describe('FnDesc Management Detail Component', () => {
        let comp: FnDescDetailComponent;
        let fixture: ComponentFixture<FnDescDetailComponent>;
        let service: FnDescService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ManaProjectTestModule],
                declarations: [FnDescDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FnDescService,
                    JhiEventManager
                ]
            }).overrideTemplate(FnDescDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FnDescDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FnDescService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new FnDesc(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.fnDesc).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
