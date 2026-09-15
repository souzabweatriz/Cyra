package com.cti.provedor.controller;

import com.cti.provedor.dto.UsuarioDTO;
import com.cti.provedor.model.Usuario;
import com.cti.provedor.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping
    public Usuario criar(@Valid @RequestBody UsuarioDTO dto) {
        return service.criar(dto);
    }

    @GetMapping
    public List<Usuario> listar() {
        return service.listar();
    }

    @PutMapping("/{id}")
    public Usuario atualizar(
            @PathVariable Long id,
            @Valid @RequestBody UsuarioDTO dto) {
        return service.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable Long id) {
        service.remover(id);
    }
}