package br.com.cyra.backend.dto;

import br.com.cyra.backend.model.Usuario;

public record UsuarioRespostaDTO(Long id, String nome, String email, String perfil) {
    public static UsuarioRespostaDTO de(Usuario usuario) {
        return new UsuarioRespostaDTO(usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getPerfil().name());
    }
}
