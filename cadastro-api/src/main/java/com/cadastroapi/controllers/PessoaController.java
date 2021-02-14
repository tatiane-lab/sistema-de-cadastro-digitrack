package com.cadastroapi.controllers;

import java.util.Objects;
import javax.validation.Valid;

import com.cadastroapi.exceptions.PessoaException;
import com.cadastroapi.models.Pessoa;
import com.cadastroapi.response.Response;
import com.cadastroapi.services.PessoaService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/pessoas")
@CrossOrigin(origins = "*")
public class PessoaController {

	private final PessoaService pessoaService;

	@PostMapping
	public ResponseEntity<Response<Pessoa>> save(@Valid @RequestBody Pessoa pessoa,
		BindingResult result) {
		return saveOrUpdate(pessoa, result);
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Response<String>> remover(@PathVariable("id") Long id) {
		this.pessoaService.delete(id);
		return ResponseEntity.ok(new Response<>());
	}

	@GetMapping
	public ResponseEntity<Page<Pessoa>> getAll(
		@RequestParam(value = "pageNumber", defaultValue = "0") Integer pageNo,
		@RequestParam(value = "pageSize", defaultValue = "20") Integer pageSize,
		@RequestParam(value = "ord", defaultValue = "id") String sortBy,
		@RequestParam(value = "dir", defaultValue = "ASC") String dir,
		@RequestParam(value = "dataNascimento", defaultValue = "") String dataNascimento,
		@RequestParam(value = "sexo", defaultValue = "") String sexo
	) {
		Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(Sort.Direction.fromString(dir), sortBy));
		Page<Pessoa> result = this.pessoaService.getAll(paging, dataNascimento, sexo);
		return ResponseEntity.ok(result);
	}

	@GetMapping(value = "/{id}")
	public Pessoa getById(@PathVariable("id") Long id) {
		return this.pessoaService.getById(id);
	}

	@PutMapping
	public ResponseEntity<Response<Pessoa>> update(@Valid @RequestBody Pessoa pessoa,
		BindingResult result) {
		if (Objects.isNull(pessoa.getId())) {
			throw new PessoaException("O campo id deve ser preenchido para atualizar uma pessoa.");
		}
		return saveOrUpdate(pessoa, result);
	}

	private ResponseEntity<Response<Pessoa>> saveOrUpdate(Pessoa pessoa, BindingResult result) {
		Response<Pessoa> response = new Response<>();
		if (result.hasErrors()) {
			result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
			return ResponseEntity.badRequest().body(response);
		}
		response.setData(this.pessoaService.save(pessoa));
		return ResponseEntity.ok(response);
	}
}
