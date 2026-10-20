package br.com.cyra.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record ClienteImportacaoDTO(
        String codigo,
        @NotBlank(message = "O nome do cliente é obrigatório.") String nome,
        @Email(message = "Informe um e-mail válido.") String email,
        String segmento,
        String nivel,
        @NotNull(message = "O faturamento anual é obrigatório.") BigDecimal faturamentoAnual
) {
}
