import { Observable } from "rxjs";
import { Page, PageParams } from "../models/page.model";

export interface Service<T> {

  save(obj: T, opt?: any): Observable<T>;

  update(id: number, obj: T, opt?: any): Observable<T>;

  delete(id: number): Observable<T>;

  get(id: number): Observable<T>;

  getAll(params: PageParams): Observable<Page<T>>;
}
