package br.com.cyra.backend.controller;

import br.com.cyra.backend.dto.ClienteImportacaoDTO;
import br.com.cyra.backend.model.Cliente;
import br.com.cyra.backend.repository.ClienteRepository;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/clientes")
public class ClienteImportacaoController {
    private final ClienteRepository clienteRepository;

    public ClienteImportacaoController(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @PostMapping("/importar")
    @Transactional
    public ResponseEntity<Map<String, Integer>> importar(@RequestBody List<@Valid ClienteImportacaoDTO> dados) {
        List<Cliente> clientes = dados.stream().map(this::mapear).toList();
        clienteRepository.saveAll(clientes);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "recebidos", dados.size(),
                "importados", clientes.size()
        ));
    }

    private Cliente mapear(ClienteImportacaoDTO dado) {
        Cliente cliente = new Cliente();
        cliente.setCodigoCliente(dado.codigo());
        cliente.setNome(dado.nome().trim());
        cliente.setEmail(dado.email());
        cliente.setSegmento(dado.segmento());
        cliente.setNivel(dado.nivel());
        cliente.setFaturamentoAnual(dado.faturamentoAnual());
        return cliente;
    }
}
