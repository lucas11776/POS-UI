import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CategoriesService } from './categories.service';
import { 
  Category as CategoryMock,
  CreateCategory as CreateCategoryMock,
  UpdateCategory as UpdateCategoryMock } from '../../../core/mocks/category.mock';
import { HttpService } from '../../../core/http/http.service';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let httpService: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(CategoriesService);
    httpService = TestBed.inject(HttpService);
  });

  it('should check if Category service is created.', () => {
    expect(service).toBeTruthy();
  });

  it('should make request to get categories from api.', fakeAsync(() => {
    const categories = [CategoryMock(), CategoryMock(), CategoryMock()];
    spyOn(httpService, 'get').and.returnValue(of(categories))
    service.get().subscribe(c => expect(c).toEqual(categories));
    tick();
  }));

  it('should make request to create category from api.', fakeAsync(() => {
    const category = CategoryMock();
    spyOn(httpService, 'post').and.returnValue(of(category));
    service.create(CreateCategoryMock()).subscribe(c => expect(c).toEqual(category));
    tick();
  }));

  it('should make request to update category from api.', fakeAsync(() => {
    const category = CategoryMock();
    spyOn(httpService, 'patch').and.returnValue(of(category));
    service.update(UpdateCategoryMock()).subscribe(c => expect(c).toEqual(category));
    tick();
  }));

  it('should make request to delete category from api.', fakeAsync(() => {
    const response = { message: 'Category have been deleted.' };
    spyOn(httpService, 'delete').and.returnValue(of(response));
    service.delete(1).subscribe(r => expect(r).toEqual(response));
    tick();
  }));
});
