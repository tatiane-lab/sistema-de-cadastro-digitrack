package com.cadastroapi.models;

import java.time.LocalDate;
import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;

import lombok.Data;

@Data
@Entity
@Table(name = "pessoa")
public class Pessoa {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@NotNull(message = "Endereço deve ser preenchido")
	@OneToOne(cascade = CascadeType.ALL, optional = false)
	private Endereco endereco;

	@NotNull(message = "Nome deve ser preenchido")
	@Column(nullable = false, length = 60)
	private String nome;

	@NotNull(message = "Sobrenome deve ser preenchido")
	@Column(nullable = false, length = 60)
	private String sobrenome;

	@NotNull(message = "CPF deve ser preenchido")
	@Column(nullable = false, length = 11, unique = true)
	private String cpf;

	@Past(message = "Informe uma data de nascimento válida")
	@NotNull(message = "Data de nascimento deve ser preenchida")
	@Column(nullable = false)
	private LocalDate dataNascimento;

	@NotNull(message = "Email deve ser preenchido")
	@Email
	@Column(nullable = false, unique = true)
	private String email;

	@NotNull(message = "Sexo deve ser preenchido")
	@Column(nullable = false)
	private Sexo sexo;

	@Column
	private String telefone;

	@Column
	private String descricao;

	@Column(name = "created_at", nullable = false, updatable = false)
	private Date createdAt;

	@Column(name = "updated_at", nullable = false)
	private Date updatedAt;

	@PreUpdate
	public void preUpdate() {
		updatedAt = new Date();
	}

	@PrePersist
	public void prePersist() {
		final Date atual = new Date();
		createdAt = atual;
		updatedAt = atual;
	}
}
