import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker, MatDialog, MatInput, MatPaginator, MatSelect, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { PageParams, PaginationParms, SortParms } from 'src/app/models/page.model';
import { Pessoa } from 'src/app/models/pessoa.model';
import { LazyDataSource } from 'src/app/services/lazy';
import { PessoaService } from 'src/app/services/pessoa.service';
import * as moment from 'moment';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  dataSource: LazyDataSource<Pessoa>;
  displayedColumns = ["id",'nome', 'sexo', 'dataNascimento', 'email','cpf', 'actions'];
  pageSizeOptions: number[] = [10, 50, 100];
  length: number;
  dataNascimento: string = "";
  sexo: string = "";

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatDatepicker, {static: true}) datePicker:  MatDatepicker<Date>;
  @ViewChild(MatSelect, {static: true}) sexoSelect:  MatSelect;

  @ViewChild('dataInput', {read:MatInput, static: true}) dataInput: MatInput;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  constructor(
    private service: 	PessoaService,
    public confirmationDialog: MatDialog,
    private router: Router,
    ) { }

  ngAfterViewChecked() {
      const list = document.getElementsByClassName('mat-paginator-range-label');
      let numberOfPage = this.paginator.pageIndex + 1;
      let qtdPaginas = Math.ceil(this.paginator.length/this.paginator.pageSize)
      list[0].innerHTML = 'Página: ' + numberOfPage + " de " + qtdPaginas;
  }
  ngOnInit() {
    this.dataSource = new LazyDataSource(this.service);
    this.dataSource.paginator = this.paginator;
    this.dataSource.loadData();
  }

  limparFiltros(){
    this.dataInput.value = ""
    this.dataNascimento = ""
    this.sexo = ""
    this.loadData();
  }

  onChange(value) {
    if (value!=null){
      this.dataNascimento = moment(value).format('YYYY-MM-DD');
    }else{
      this.dataNascimento = ""
    }
    this.loadData();
  }

  onChangeSexo(value) {
    this.sexo = value;
    this.loadData();
  }

  onDelete(id: number, nome: string) {
    const dialogRef = this.confirmationDialog.open(
      ConfirmationDialogComponent,
      {
        width: "220px",
        data: {
          title: "Desejar deletar essa pessoa?",
          message: nome,
          confirm: "Deletar",
          dismiss: "Cancelar",
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.removeUser(id);
      }
    });
  }

  removeUser(id: number) {
    this.service.delete(id).subscribe(() => {
      this.dataSource.loadData();
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).pipe(tap(() => this.loadData())).subscribe();
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

  destroyItasset(row: { id: string; }) {
    this.service.delete(+row.id).subscribe(() => { });
  }

  private loadData() {
    const sort =  new SortParms('id', this.sort.direction.toUpperCase());
    const pagination = new PaginationParms(this.paginator.pageIndex, this.paginator.pageSize);
    const pageParms = new PageParams(sort, pagination);
    pageParms.dataNascimento = this.dataNascimento;
    pageParms.sexo = this.sexo;
    this.dataSource.loadData(pageParms);
    this.length = this.dataSource.paginator.length;
  }
}
