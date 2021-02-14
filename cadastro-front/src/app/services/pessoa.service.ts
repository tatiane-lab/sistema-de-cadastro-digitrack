import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { PageParams, Page } from "../models/page.model";
import { Pessoa } from "../models/pessoa.model";
import { Service } from "./service";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PessoaService implements Service<Pessoa> {

  public API = environment.api;

  public PESSOAS_URI = this.API + '/pessoas';

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation}: ${error}`);
      return of(result as T);
    };
  }

  save(obj: Pessoa, opt?: any): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.PESSOAS_URI, obj);
  }

  update(id: number, obj: Pessoa, opt?: any): Observable<Pessoa> {
    return this.http.put<Pessoa>(this.PESSOAS_URI, { id, ...obj });
  }

  delete(id: number): Observable<Pessoa> {
    const url  = this.PESSOAS_URI + '/' + id;
    return this.http.delete<Pessoa>(url);
  }

  get(id: number): Observable<Pessoa> {
    const url = this.PESSOAS_URI + '/' + id;
    return this.http.get<Pessoa>(url).pipe(
      catchError(this.handleError<Pessoa>(`get with id=${id}`))
    );
  }

  getAll(params: PageParams): Observable<Page<Pessoa>> {
    let par = new HttpParams()
      .set('pageNumber', params.pagination.pageNumber.toString())
      .set('pageSize', params.pagination.pageSize.toString())
      .set('ord', params.sort.ord)
      .set('dir', params.sort.dir)
      .set('dataNascimento', params.dataNascimento)
      .set('sexo', params.sexo);
      return this.http.get<Page<Pessoa>>(this.PESSOAS_URI, { params: par });
  }
}
