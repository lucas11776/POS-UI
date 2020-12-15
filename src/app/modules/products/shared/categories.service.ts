import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http/http.service';
import { shareReplay, switchMap, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { Category, CreateCategory, UpdateCategory } from '../../../shared/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categorisSubject = new BehaviorSubject<void>(null);
  categories$: Observable<Category[]> = this.categorisSubject.pipe(
    switchMap(_ => this.get()),
    shareReplay(1)
  );

  constructor(private _http: HttpService) { }

  get(): Observable<Category[]> {
    return this._http.get<Category[]>('products/categories');
  }

  create(form: CreateCategory): Observable<Category> {
    return this._http.post<Category>('products/categories', form).pipe(
      tap(_ => this.categorisSubject.next())
    );
  }

  update(category: UpdateCategory): Observable<Category> {
    return this._http.patch<Category>(`products/categories/${category.id}`, { name: category.name }).pipe(
      tap(_ => this.categorisSubject.next())
    )
  }

  delete(id: number): Observable<any> {
    return this._http.delete(`products/categories/${id}`).pipe(
      tap(_ => this.categorisSubject.next())
    );
  }
}
