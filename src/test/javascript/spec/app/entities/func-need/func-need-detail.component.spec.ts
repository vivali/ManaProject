/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ManaProjectTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FuncNeedDetailComponent } from '../../../../../../main/webapp/app/entities/func-need/func-need-detail.component';
import { FuncNeedService } from '../../../../../../main/webapp/app/entities/func-need/func-need.service';
import { FuncNeed } from '../../../../../../main/webapp/app/entities/func-need/func-need.model';

describe('Component Tests', () => {

    describe('FuncNeed Management Detail Component', () => {
        let comp: FuncNeedDetailComponent;
        let fixture: ComponentFixture<FuncNeedDetailComponent>;
        let service: FuncNeedService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ManaProjectTestModule],
                declarations: [FuncNeedDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FuncNeedService,
                    JhiEventManager
                ]
            }).overrideTemplate(FuncNeedDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FuncNeedDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FuncNeedService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new FuncNeed(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.funcNeed).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
