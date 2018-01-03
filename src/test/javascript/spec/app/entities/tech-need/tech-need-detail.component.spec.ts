/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ManaProjectTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TechNeedDetailComponent } from '../../../../../../main/webapp/app/entities/tech-need/tech-need-detail.component';
import { TechNeedService } from '../../../../../../main/webapp/app/entities/tech-need/tech-need.service';
import { TechNeed } from '../../../../../../main/webapp/app/entities/tech-need/tech-need.model';

describe('Component Tests', () => {

    describe('TechNeed Management Detail Component', () => {
        let comp: TechNeedDetailComponent;
        let fixture: ComponentFixture<TechNeedDetailComponent>;
        let service: TechNeedService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ManaProjectTestModule],
                declarations: [TechNeedDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TechNeedService,
                    JhiEventManager
                ]
            }).overrideTemplate(TechNeedDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TechNeedDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TechNeedService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TechNeed(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.techNeed).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
