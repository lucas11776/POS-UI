import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CategoryService } from './category.service';
import { Category as CategoryMock, CreateCategory, UpdateCategory } from '../../../core/mocks/category.mock';
import { HttpService } from '../../../core/http/http.service';
import { Category } from 'src/app/shared/models/category.model';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpService: HttpService;
  let category: Category;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(CategoryService);
    httpService = TestBed.inject(HttpService);
    category = CategoryMock();
  });

  it('should check if Category service is created.', () => {
    expect(service).toBeTruthy();
  });


  it('should create a new category.', fakeAsync(() => {
    spyOn(httpService, 'post').and.returnValue(of(category));
    let createdCategory = null;
    service.create(CreateCategory()).subscribe(data => createdCategory = data);
    tick();
    expect(createdCategory).toEqual(category);
  }));

  it('should update a category.', fakeAsync(() => {
    spyOn(httpService, 'patch').and.returnValue(of(category));
    let updatedCategory = null;
    service.update(UpdateCategory()).subscribe(c => updatedCategory = c);
    tick();
    expect(updatedCategory).toEqual(category);
  }));

  it('should delete category.', fakeAsync(() => {
    const response = { message: 'Category have been deleted.' };
    spyOn(httpService, 'delete').and.returnValue(of(response));
    let deletedResponse = null;
    service.delete(category.id).subscribe(msg => deletedResponse = msg);
    expect(deletedResponse).toEqual(response);
  }));
});
