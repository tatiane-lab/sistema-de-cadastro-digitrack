package com.cadastroapi.repositories;

import java.time.LocalDate;
import java.util.List;

import com.cadastroapi.models.Pessoa;
import com.cadastroapi.models.Sexo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Long> {

	List<Pessoa> findByEmailOrCpf(String email, String cpf);

	Page<Pessoa> findAllBySexoAndAndDataNascimento(Sexo sexo, LocalDate dataNascimento, Pageable pageable);

	Page<Pessoa> findAllBySexo(Sexo sexo, Pageable pageable);

	Page<Pessoa> findAllByDataNascimento(LocalDate dataNascimento, Pageable pageable);

}
