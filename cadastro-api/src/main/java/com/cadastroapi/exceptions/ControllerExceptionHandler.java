package com.cadastroapi.exceptions;

import com.cadastroapi.response.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ControllerExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler(PessoaException.class)
	public ResponseEntity<Response<Void>> schedulingNotAvailableException(PessoaException e) {
		Response<Void> response = new Response<>();
		response.getErrors().add(e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST.value()).body(response);
	}
}
