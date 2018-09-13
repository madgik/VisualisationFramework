package gr.uoa.di.aginfra.data.analytics.visualization.service.controllers;

import gr.uoa.di.aginfra.data.analytics.visualization.model.exceptions.InvalidFormatException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.NoSuchElementException;

@Component
public class BaseController {

	private static final Logger logger = LogManager.getLogger(BaseController.class);

	@ExceptionHandler(NoSuchElementException.class)
	public final ResponseEntity<String> handleNoSuchElementException(NoSuchElementException e) {
		logger.info(e.getMessage(), e);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	}
	
	@ExceptionHandler(IllegalArgumentException.class)
	public final ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
		logger.error(e.getMessage(), e);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public final ResponseEntity<String> handleValidationException(MethodArgumentNotValidException exception) {

		String errorMsg = exception.getBindingResult().getFieldErrors().stream()
				.map(DefaultMessageSourceResolvable::getDefaultMessage)
				.findFirst()
				.orElse(exception.getMessage());

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMsg);
	}

	@ExceptionHandler(InvalidFormatException.class)
	public final ResponseEntity<String> handleInvalidFormatException(InvalidFormatException exception) {
		logger.error(exception.getMessage(), exception);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
	}

	@ExceptionHandler(Exception.class)
	public final ResponseEntity<String> handleGenericException(Exception exception) {
		logger.error(exception.getMessage(), exception);
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
	}
}
