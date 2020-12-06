import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { timer } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'ks-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Output('pagination') pagination = new EventEmitter<number>();
  @Input('perPage') perPage: number;
  @Input('total') total: number;
  sub = new SubSink;
  active: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
    this.sub.sink = this._activatedRoute.queryParams
      .subscribe(params => this.queryParamsEvent(params));
  }

  pages(): number {
    const pageDivision = Math.floor(this.total / this.perPage);
    const pagesRemaining = this.total % this.perPage;
    return pageDivision + (pagesRemaining > 0 ? 1 : 0);
  }

  paginate(page: number): void {
    this.sub.sink = timer(500)
      .subscribe(_ => this.pagination.emit(page));
    this._router.navigate([], { queryParams: { page: page } });
  }
  
  protected queryParamsEvent(params: Params): void {
    this.setPage(params);
  }

  protected setPage(params: Params) {
    this.active = params.page ? params.page : 1
  }
}
