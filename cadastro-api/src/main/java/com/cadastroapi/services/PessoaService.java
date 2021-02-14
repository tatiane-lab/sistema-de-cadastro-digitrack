package com.cadastroapi.services;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import com.cadastroapi.exceptions.PessoaException;
import com.cadastroapi.models.Pessoa;
import com.cadastroapi.models.Sexo;
import com.cadastroapi.repositories.PessoaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PessoaService {

	private final PessoaRepository pessoaRepository;

	public Page<Pessoa> getAll(Pageable pageable, String dataNascimento, String sexo) {
		if (!dataNascimento.isEmpty() && !sexo.isEmpty()) {
			return this.pessoaRepository.findAllBySexoAndAndDataNascimento(Sexo.valueOf(sexo), converterDataToString(dataNascimento), pageable);
		}
		if (!dataNascimento.isEmpty()) {
			return this.pessoaRepository.findAllByDataNascimento(converterDataToString(dataNascimento), pageable);
		}
		if (!sexo.isEmpty()) {
			return this.pessoaRepository.findAllBySexo(Sexo.valueOf(sexo), pageable);
		}
		return getAll(pageable);
	}

	public LocalDate converterDataToString(String data) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		return LocalDate.parse(data, formatter);
	}

	public Page<Pessoa> getAll(Pageable pageable) {
		return this.pessoaRepository.findAll(pageable);
	}

	public Pessoa getById(Long id) {
		return this.pessoaRepository.findById(id).orElseThrow(() -> new PessoaException("Pessoa não encontrada"));
	}

	public Pessoa save(Pessoa pessoa) {
		validarPessoa(pessoa);
		return this.pessoaRepository.save(pessoa);
	}

	private void validarPessoa(Pessoa pessoa) {
		if (!isAvailable(pessoa)) {
			throw new PessoaException("Pessoa já existente");
		}
	}

	private boolean isAvailable(Pessoa pessoa) {
		List<Pessoa> pessoasExistentes = this.pessoaRepository.findByEmailOrCpf(pessoa.getEmail(), pessoa.getCpf());
		boolean pessoaCadastrada = pessoasExistentes.stream().anyMatch(p -> p.getId().equals(pessoa.getId()));
		boolean verifica = pessoaCadastrada && pessoasExistentes.size() == 1;
		return pessoasExistentes.isEmpty() || verifica;
	}

	public void delete(Long id) {
		this.pessoaRepository.delete(this.getById(id));
	}
}
