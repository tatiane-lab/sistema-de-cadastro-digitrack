import { Endereco } from "./endereco.model";

export class Pessoa{
  id: number;
  nome: string;
  sobrenome: string;
  cpf: string;
  dataNascimento: Date;
  email: string;
  sexo: string;
  telefone: string;
  descricao: string;
  endereco: Endereco;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(nome: string, sobrenome: string, cpf: string, dataNascimento: Date, email: string, sexo: string, endereco: Endereco, telefone?: string, descricao?: string){
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
    this.email = email;
    this.sexo = sexo;
    this.endereco = endereco;
    this.telefone = telefone;
    this.descricao = descricao;
  }
}
