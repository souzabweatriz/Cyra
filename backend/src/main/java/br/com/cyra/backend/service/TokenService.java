package br.com.cyra.backend.service;

import br.com.cyra.backend.model.Usuario;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TokenService {
    private final Algorithm algorithm;
    private final long expirationMinutes;

    public TokenService(@Value("${api.security.token.secret}") String secret,
                        @Value("${api.security.token.expiration-minutes}") long expirationMinutes) {
        this.algorithm = Algorithm.HMAC256(secret);
        this.expirationMinutes = expirationMinutes;
    }

    public String gerar(Usuario usuario) {
        Instant agora = Instant.now();
        return JWT.create().withSubject(usuario.getEmail()).withClaim("perfil", usuario.getPerfil().name())
            .withIssuedAt(agora).withExpiresAt(agora.plus(expirationMinutes, ChronoUnit.MINUTES)).sign(algorithm);
    }

    public String validarEObterEmail(String token) {
        try { return JWT.require(algorithm).build().verify(token).getSubject(); }
        catch (JWTVerificationException exception) { return null; }
    }
}
