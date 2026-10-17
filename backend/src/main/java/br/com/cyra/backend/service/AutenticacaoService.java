package br.com.cyra.backend.service;

import br.com.cyra.backend.dto.LoginDTO;
import br.com.cyra.backend.dto.TokenDTO;
import br.com.cyra.backend.model.Usuario;
import br.com.cyra.backend.repository.UsuarioRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AutenticacaoService {
    private final UsuarioRepository usuarios;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokens;

    public AutenticacaoService(UsuarioRepository usuarios, PasswordEncoder passwordEncoder, TokenService tokens) {
        this.usuarios = usuarios;
        this.passwordEncoder = passwordEncoder;
        this.tokens = tokens;
    }

    public TokenDTO login(LoginDTO dados) {
        Usuario usuario = usuarios.findByEmail(dados.email().trim().toLowerCase()).orElseThrow(() -> new BadCredentialsException("Credenciais inválidas"));
        if (!passwordEncoder.matches(dados.senha(), usuario.getPassword())) throw new BadCredentialsException("Credenciais inválidas");
        return new TokenDTO(tokens.gerar(usuario), usuario.getNome(), usuario.getPerfil().name());
    }
}
