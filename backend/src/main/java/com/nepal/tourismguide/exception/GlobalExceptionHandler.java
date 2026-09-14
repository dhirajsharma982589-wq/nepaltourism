package com.nepal.tourismguide.exception;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.stream.Collectors;
import java.util.Map;
@RestControllerAdvice
public class GlobalExceptionHandler {
 private ResponseEntity<Map<String,Object>> body(HttpStatus status,String message){return ResponseEntity.status(status).body(Map.of("status",status.value(),"message",message,"timestamp", Instant.now().toString()));}
 @ExceptionHandler(ApiException.class) ResponseEntity<Map<String,Object>> api(ApiException e){return body(e.getStatus(),e.getMessage());}
 @ExceptionHandler(MethodArgumentNotValidException.class) ResponseEntity<Map<String,Object>> validation(MethodArgumentNotValidException e){String message=e.getBindingResult().getFieldErrors().stream().map(x->x.getField()+": "+x.getDefaultMessage()).collect(Collectors.joining(", ")); return body(HttpStatus.BAD_REQUEST,message);}
 @ExceptionHandler(IllegalArgumentException.class) ResponseEntity<Map<String,Object>> bad(IllegalArgumentException e){return body(HttpStatus.BAD_REQUEST,e.getMessage());}
 @ExceptionHandler(Exception.class) ResponseEntity<Map<String,Object>> other(Exception e){return body(HttpStatus.INTERNAL_SERVER_ERROR,"An unexpected error occurred");}
}
