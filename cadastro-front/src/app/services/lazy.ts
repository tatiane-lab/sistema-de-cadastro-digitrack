import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { Page, PageParams } from "../models/page.model";
import { Service } from "./service";

export class LazyDataSource<T> implements DataSource<T> {
  private subject = new BehaviorSubject<T[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  private _paginator: MatPaginator | null;

  constructor(private service: Service<T>) {}
  connect(_: CollectionViewer): Observable<T[] | readonly T[]> {
    return this.subject.asObservable();
  }
  disconnect(_: CollectionViewer): void {
    this.subject.complete();
    this.loadingSubject.complete();
  }
  loadData(params: PageParams = new PageParams()) {
    this.loadingSubject.next(true);

    this.service
      .getAll(params)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((data: Page<T>) => {
        this.subject.next(data.content);
        this._updatePaginator(data.totalElements);
      });
  }
  get paginator(): MatPaginator | null {
    return this._paginator;
  }
  set paginator(paginator: MatPaginator | null) {
    this._paginator = paginator;
  }

  get data(): T[] {
    return this.subject.getValue();
  }

  _updatePaginator(filteredDataLength: number) {
    Promise.resolve().then(() => {
      if (!this.paginator) {
        return;
      }
      this._paginator.length = filteredDataLength;
      if (this._paginator.pageIndex > 0) {
        const lastPageIndex =
          Math.ceil(this.paginator.length / this.paginator.pageSize) - 1 || 0;
        this.paginator.pageIndex = Math.min(
          this.paginator.pageIndex,
          lastPageIndex
        );
      }
    });
  }
}
