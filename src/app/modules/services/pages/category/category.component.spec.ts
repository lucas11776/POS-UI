import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { of, throwError } from 'rxjs';

import { CategoryComponent } from './category.component';
import { SharedModule } from '../../../../shared/shared.module';
// import { CategoryService } from '../../shared/category.service';
import { Category } from '../../../../shared/models/category.model';
import { CreateCategory, Category as CategoryMock, UpdateCategory } from '../../../../core/mocks/category.mock';
import { HttpService } from '../../../../core/http/http.service';
import { EventBusService } from '../../../../core/services/event-bus.service';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  // let categoryService: CategoryService;
  let httpService: HttpService;
  let category: Category;
  let ngxSpinnerService: NgxSpinnerService;
  let eventBusService: EventBusService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CategoryComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        NgxSpinnerModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(HttpService);
    // categoryService = TestBed.inject(CategoryService);
    ngxSpinnerService = TestBed.inject(NgxSpinnerService);
    eventBusService = TestBed.inject(EventBusService);
    category = CategoryMock();
    fixture.detectChanges();
  });

  beforeEach(() => {
    spyOn(ngxSpinnerService, 'show').and.returnValue(null);
    spyOn(ngxSpinnerService, 'hide').and.returnValue(null);
  });

  it('should check if Category component is created.', () => {
    expect(component).toBeTruthy();
  });
});
