import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PaginationComponent } from './pagination.component';
import { SharedModule } from '../../shared.module';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  const perPage = 3; 
  const total = 10;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PaginationComponent
      ],
      imports: [
        RouterTestingModule,
        SharedModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.perPage = perPage;
    component.total = total;
    fixture.detectChanges();
  });

  it('should check if Pagination component is created.', () => {
    expect(component).toBeTruthy();
  });

  it('should display 2 pages when total is 10 and perPage is 5.', () => {
    component.perPage = 5;
    component.total = 10;
    expect(component.pages()).toBe(2);
  });

  it('should display 3 pages when total is 10 and perPage is 4 for 2 remaning items.', () => {
    component.perPage = 4;
    component.total = 10;
    expect(component.pages()).toBe(3);
  });

  it('should emit page number when paginate is called after 500ms.', fakeAsync(() => {
    component.pagination.subscribe(page => expect(page).toBe(1));
    component.paginate(1);
    tick(500);
  }));
});
