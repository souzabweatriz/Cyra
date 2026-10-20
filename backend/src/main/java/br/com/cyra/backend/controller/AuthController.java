package br.com.cyra.backend.controller;

import br.com.cyra.backend.dto.CadastroDTO;
import br.com.cyra.backend.dto.LoginDTO;
import br.com.cyra.backend.dto.TokenDTO;
import br.com.cyra.backend.dto.UsuarioRespostaDTO;
import br.com.cyra.backend.model.Usuario;
import br.com.cyra.backend.service.AutenticacaoService;
import br.com.cyra.backend.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UsuarioService usuarios;
    private final AutenticacaoService autenticacao;

    public AuthController(UsuarioService usuarios, AutenticacaoService autenticacao) {
        this.usuarios = usuarios;
        this.autenticacao = autenticacao;
    }

    @PostMapping("/register")
    public ResponseEntity<UsuarioRespostaDTO> cadastrar(@Valid @RequestBody CadastroDTO dados) {
        return ResponseEntity.status(HttpStatus.CREATED).body(UsuarioRespostaDTO.de(usuarios.cadastrar(dados)));
    }

    @PostMapping("/login")
    public TokenDTO login(@Valid @RequestBody LoginDTO dados) { return autenticacao.login(dados); }

    @GetMapping("/me")
    public UsuarioRespostaDTO eu(@AuthenticationPrincipal Usuario usuario) { return UsuarioRespostaDTO.de(usuario); }
}
