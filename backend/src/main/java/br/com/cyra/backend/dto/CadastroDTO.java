package br.com.cyra.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CadastroDTO(
    @NotBlank(message = "Informe o nome") @Size(max = 100, message = "Nome com no máximo 100 caracteres") String nome,
    @NotBlank(message = "Informe o e-mail") @Email(message = "E-mail inválido") @Size(max = 150, message = "E-mail com no máximo 150 caracteres") String email,
    @NotBlank(message = "Informe a senha") @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d).{8,72}$", message = "A senha deve ter de 8 a 72 caracteres, com letras e números") String senha
) { }
