export class Endereco {
  id: number;
  cidade: string;
  endereco: string;
  bairro: string;
  numero: string;
  coordenadas: string;

  constructor(cidade: string, endereco: string, numero: string, bairro:string, coordenadas: string){
      this.bairro= bairro;
      this.cidade= cidade;
      this.numero = numero;
      this.coordenadas = coordenadas;
      this.endereco = endereco;
  }
}
