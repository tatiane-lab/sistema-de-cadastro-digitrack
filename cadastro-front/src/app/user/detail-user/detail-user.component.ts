import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pessoa } from 'src/app/models/pessoa.model';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {
  pessoa$: Observable<Pessoa>;

  public lat: number;
  public lng: number;

  constructor(
    private service: PessoaService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.pessoa$ = this.service.get(+id);
    this.service.get(+id).subscribe(data => {
      let coord: string[] = data.endereco.coordenadas.split(";");
      this.atualizarMapa(+coord[0], +coord[1]);
    })
  }

  public atualizarMapa(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }
}
