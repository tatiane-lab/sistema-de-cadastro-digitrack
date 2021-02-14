import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Endereco } from 'src/app/models/endereco.model';
import { Pessoa } from 'src/app/models/pessoa.model';
import { PessoaService } from 'src/app/services/pessoa.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  private readonly GOOGLE_MAPS_GEOLOCATION_URI: string = "https://maps.google.com/maps/api/geocode/json?address=";

  isEdited : boolean = false;

  public pessoaForm: FormGroup;
  public sexoOptions: string []  = ["Masculino", "Feminino"];

  title = 'Mapa - Endereço';

  public lat: number;
  public lng: number;
  public id: number;
  maxDate = new Date()


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: PessoaService,
    ) { }

  ngOnInit() {
    this.pessoaForm = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.maxLength(60)]],
      sobrenome: [null, [Validators.maxLength(60)]],
      cpf: [null, [Validators.maxLength(11), Validators.minLength(11), Validators.pattern("^[0-9]*$")]],
      dataNascimento: [null, [Validators.required]],
      email: [null, [Validators.email]],
      descricao: [null],
      telefone: [null],
      sexo: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      numero: [null, [Validators.required]],
      endereco: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
    });
    this.maxDate.setDate(this.maxDate.getDate() -1);

    this.lat = 0;
    this.lng = 0;

    this.id = +this.route.snapshot.paramMap.get('id');

    this.service.get(this.id).subscribe(data => {
      this.preencherDadosPessoa(data);
    })
  }

  public preencherDadosPessoa(data: Pessoa) {
     let coord: string[] = data.endereco.coordenadas.split(";");
    this.atualizarMapaPessoa(+coord[0], +coord[1]);
    this.pessoaForm.patchValue({
      ...data,
      endereco: data.endereco.endereco,
      bairro: data.endereco.bairro,
      cidade: data.endereco.cidade,
      numero: data.endereco.numero,
    })
  }

  public atualizarMapaPessoa(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }

  public hasError(controlName: string, errorName: string) {
    return this.pessoaForm.controls[controlName].hasError(errorName);
  }

  public onSubmit(data: any) {
    console.log(data)
    const coordenadas: string = this.lat.toString() + ";" + this.lng.toString();
    const endereco = new Endereco(data.cidade, data.endereco, data.numero, data.bairro, coordenadas);
    const pessoa = new Pessoa(data.nome, data.sobrenome, data.cpf, data.dataNascimento, data.email, data.sexo, endereco, data.telefone, data.descricao);
    this.service.update(this.id, pessoa).subscribe(() => {
      this.isEdited = true;
      this.gotoList();
    }, error => {
      alert(error.error.errors[0])
      console.error(error);
    });
  }

  public atualizarMapa(address: string) {
    let uri = this.GOOGLE_MAPS_GEOLOCATION_URI + address+ "&key=" + environment.googleApiKey;
    fetch(uri)
    .then(T => T.json())
    .then(res => {
      let data = res.results[0];
      console.log(data);
      this.lat = data.geometry.location.lat;
      this.lng = data.geometry.location.lng;
      console.log(this.lat, this.lng)
    })

  }
  public onCancel() {
    this.pessoaForm.reset();
  }
  gotoList() {
    this.isEdited = true;
    this.router.navigate(['/pessoas/list']).then(() => {
      console.log('Redirecting to list view');
    });
  }
}
