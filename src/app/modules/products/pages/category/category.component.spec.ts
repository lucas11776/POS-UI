import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { of, throwError } from 'rxjs';

import { CategoryComponent } from './category.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CategoryService } from '../../shared/category.service';
import { Category } from '../../../../shared/models/category.model';
import { CreateCategory, Category as CategoryMock, UpdateCategory } from '../../../../core/mocks/category.mock';
import { HttpService } from '../../../../core/http/http.service';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let categoryService: CategoryService;
  let httpService: HttpService;
  let category: Category;
  let ngxSpinnerService: NgxSpinnerService;

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
    categoryService = TestBed.inject(CategoryService);
    ngxSpinnerService = TestBed.inject(NgxSpinnerService);
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

  it('should display loader when making request to create new category.', () => {
    component.create(CreateCategory());
    expect(ngxSpinnerService.show).toHaveBeenCalled();
  });

  it('should create new category and fetch categories from the service.', fakeAsync(() => {
    const categoriesList = [CategoryMock(), CategoryMock(), CategoryMock()];
    spyOn(httpService, 'get').and.returnValue(of(categoriesList));
    spyOn(httpService, 'post').and.returnValue(of(category));
    let categories = null;
    component.categories$.subscribe(c => categories = c)
    component.create(CreateCategory());
    tick();
    expect(categories).toEqual(categoriesList);
  }));

  it('should hide spinner when create category request is complete.', fakeAsync(() => {
    spyOn(categoryService, 'create').and.returnValue(of(category));
    component.create(CreateCategory());
    tick();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  }));

  it('should hide spinner when create category request failed.', fakeAsync(() => {
    spyOn(categoryService, 'create').and.returnValue(throwError({ message: 'Something went wrong...' }));
    component.create(CreateCategory());
    tick();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  }));

  it('should display loader when making request to update a category.', () => {
    component.update(UpdateCategory());
    expect(ngxSpinnerService.show).toHaveBeenCalled();
  });

  it('should get categories when category was updated successfully.', fakeAsync(() => {
    const categoriesList = [CategoryMock(), CategoryMock(), CategoryMock()];
    spyOn(httpService, 'get').and.returnValue(of(categoriesList));
    spyOn(httpService, 'patch').and.returnValue(of(category));
    let categories = null;
    component.categories$.subscribe(c => categories = c);
    component.update(UpdateCategory());
    tick();
    expect(categories).toEqual(categoriesList);
  }));

  it('should hide spinner when update category request is complete.', fakeAsync(() => {
    spyOn(categoryService, 'update').and.returnValue(of(category));
    component.update(UpdateCategory());
    tick();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  }));

  it('should hide spinner when update category request failed.', fakeAsync(() => {
    spyOn(categoryService, 'update').and.returnValue(throwError({ message: 'Something went wrong...' }));
    component.update(UpdateCategory());
    tick();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  }));


  it('should display loader when making request to delete a category.', () => {
    component.delete(1);
    expect(ngxSpinnerService.show).toHaveBeenCalled();
  });

  it('should get categories when deleting category a category was successfully.', fakeAsync(() => {
    const categoriesList = [CategoryMock(), CategoryMock(), CategoryMock()];
    spyOn(httpService, 'get').and.returnValue(of(categoriesList));
    spyOn(httpService, 'delete').and.returnValue(of(category));
    let categories = null;
    component.categories$.subscribe(c => categories = c);
    component.delete(1);
    tick();
    expect(categories).toEqual(categoriesList);
  }));

  it('should hide spinner when delete category request is complete.', fakeAsync(() => {
    spyOn(categoryService, 'delete').and.returnValue(of(category));
    component.delete(1);
    tick();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  }));

  it('should hide spinner when delete category request failed.', fakeAsync(() => {
    spyOn(categoryService, 'delete').and.returnValue(throwError({ message: 'Something went wrong...' }));
    component.delete(1);
    tick();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  }));
});
