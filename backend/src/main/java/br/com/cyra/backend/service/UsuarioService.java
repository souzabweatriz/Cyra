package br.com.cyra.backend.service;

import br.com.cyra.backend.dto.CadastroDTO;
import br.com.cyra.backend.exception.EmailJaCadastradoException;
import br.com.cyra.backend.model.Usuario;
import br.com.cyra.backend.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarios;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarios, PasswordEncoder passwordEncoder) {
        this.usuarios = usuarios;
        this.passwordEncoder = passwordEncoder;
    }

    public Usuario cadastrar(CadastroDTO dados) {
        String email = dados.email().trim().toLowerCase();
        if (usuarios.existsByEmail(email)) throw new EmailJaCadastradoException();
        return usuarios.save(new Usuario(dados.nome().trim(), email, passwordEncoder.encode(dados.senha())));
    }
}
