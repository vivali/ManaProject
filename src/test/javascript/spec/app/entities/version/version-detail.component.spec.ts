/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ManaProjectTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { VersionDetailComponent } from '../../../../../../main/webapp/app/entities/version/version-detail.component';
import { VersionService } from '../../../../../../main/webapp/app/entities/version/version.service';
import { Version } from '../../../../../../main/webapp/app/entities/version/version.model';

describe('Component Tests', () => {

    describe('Version Management Detail Component', () => {
        let comp: VersionDetailComponent;
        let fixture: ComponentFixture<VersionDetailComponent>;
        let service: VersionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ManaProjectTestModule],
                declarations: [VersionDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    VersionService,
                    JhiEventManager
                ]
            }).overrideTemplate(VersionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VersionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VersionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Version(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.version).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
