package com.cti.provedor.service;

import com.cti.provedor.dto.UsuarioDTO;
import com.cti.provedor.model.Usuario;
import com.cti.provedor.repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;
    private final BCryptPasswordEncoder encoder;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
        this.encoder = new BCryptPasswordEncoder();
    }

    public Usuario criar(UsuarioDTO dto) {
        Usuario usuario = new Usuario();

        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());

        String senhaHash = encoder.encode(dto.getSenha());
        usuario.setSenhaHash(senhaHash);

        return repository.save(usuario);
    }

    public List<Usuario> listar() {
        return repository.findAll();
    }

    public Usuario atualizar(Long id, UsuarioDTO dto) {
        Usuario usuario = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());

        if (dto.getSenha() != null && !dto.getSenha().isBlank()) {
            usuario.setSenhaHash(encoder.encode(dto.getSenha()));
        }

        return repository.save(usuario);
    }

    public void remover(Long id) {
        repository.deleteById(id);
    }
}