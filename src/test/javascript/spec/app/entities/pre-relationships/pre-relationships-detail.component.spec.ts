/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ManaProjectTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PreRelationshipsDetailComponent } from '../../../../../../main/webapp/app/entities/pre-relationships/pre-relationships-detail.component';
import { PreRelationshipsService } from '../../../../../../main/webapp/app/entities/pre-relationships/pre-relationships.service';
import { PreRelationships } from '../../../../../../main/webapp/app/entities/pre-relationships/pre-relationships.model';

describe('Component Tests', () => {

    describe('PreRelationships Management Detail Component', () => {
        let comp: PreRelationshipsDetailComponent;
        let fixture: ComponentFixture<PreRelationshipsDetailComponent>;
        let service: PreRelationshipsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ManaProjectTestModule],
                declarations: [PreRelationshipsDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PreRelationshipsService,
                    JhiEventManager
                ]
            }).overrideTemplate(PreRelationshipsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PreRelationshipsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PreRelationshipsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PreRelationships(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.preRelationships).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
