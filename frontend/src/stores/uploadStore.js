import { defineStore } from 'pinia'
import * as XLSX from 'xlsx'

const CAMPOS_OBRIGATORIOS = [
  'codigo_cliente',
  'nome_cliente',
  'consultor',
  'segmento',
  'nivel_cliente',
  'faturamento_anual'
]

const ALIASES_DE_COLUNA = {
  codigo_cliente: ['codigo_cliente', 'codigo cliente', 'codigo', 'id cliente'],
  nome_cliente: ['nome_cliente', 'nome cliente', 'nome', 'cliente'],
  email: ['email', 'e-mail', 'email cliente'],
  consultor: ['consultor', 'nome consultor'],
  segmento: ['segmento'],
  nivel_cliente: ['nivel_cliente', 'nivel cliente', 'nivel'],
  faturamento_anual: ['faturamento_anual', 'faturamento anual', 'faturamento']
}

const rotulos = {
  codigo_cliente: 'Código do cliente',
  nome_cliente: 'Nome do cliente',
  email: 'E-mail',
  consultor: 'Consultor',
  segmento: 'Segmento',
  nivel_cliente: 'Nível do cliente',
  faturamento_anual: 'Faturamento anual',
  arquivo: 'Arquivo'
}

function normalizarTexto(valor) {
  return String(valor ?? '').trim()
}

function normalizarChave(valor) {
  return normalizarTexto(valor)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function paraNumero(valor) {
  if (typeof valor === 'number') return valor

  const texto = normalizarTexto(valor)
    .replace(/R\$/gi, '')
    .replace(/\s/g, '')

  if (!texto) return Number.NaN

  const numeroBrasileiro = texto.includes(',')
    ? texto.replace(/\./g, '').replace(',', '.')
    : texto

  return Number(numeroBrasileiro)
}

function textoPadronizado(valor) {
  return normalizarTexto(valor).replace(/\s+/g, ' ')
}

export const useUploadStore = defineStore('upload', {
  state: () => ({
    arquivo: null,
    dadosOriginais: [],
    dadosTratados: [],
    erros: [],
    carregando: false,
    processado: false
  }),

  getters: {
    totalRegistros: (state) => state.processado ? state.dadosOriginais.length : 1250,
    totalClientes: (state) => state.processado ? state.dadosOriginais.length : 1250,
    totalErros: (state) => state.erros.length,
    linhasComErro: (state) => new Set(
      state.erros
        .filter((erro) => typeof erro.linha === 'number')
        .map((erro) => erro.linha)
    ).size,
    registrosValidos() {
      return Math.max(0, this.totalRegistros - this.linhasComErro)
    },
    registrosComErro() {
      return this.linhasComErro
    },
    errosPorTipo: (state) => {
      const contagem = state.erros.reduce((resultado, erro) => {
        resultado[erro.tipo] = (resultado[erro.tipo] || 0) + 1
        return resultado
      }, {})

      return Object.entries(contagem)
        .map(([tipo, total]) => ({ tipo, total }))
        .sort((a, b) => b.total - a.total || a.tipo.localeCompare(b.tipo))
    },
    clientesNivelA: (state) => state.processado ? state.dadosTratados.filter((cliente) => cliente.nivel_cliente === 'A').length : 475,
    clientesNivelB: (state) => state.processado ? state.dadosTratados.filter((cliente) => cliente.nivel_cliente === 'B').length : 513,
    clientesNivelC: (state) => state.processado ? state.dadosTratados.filter((cliente) => cliente.nivel_cliente === 'C').length : 262,
    faturamentoMedio: (state) => {
      const valores = state.dadosTratados.map((cliente) => Number(cliente.faturamento) || 0)
      return valores.length ? valores.reduce((total, valor) => total + valor, 0) / valores.length : (state.processado ? 0 : 450000)
    },
    segmentos: (state) => state.processado ? state.dadosTratados.reduce((resultado, cliente) => {
      const segmento = cliente.segmento || 'Não informado'
      resultado[segmento] = (resultado[segmento] || 0) + 1
      return resultado
    }, {}) : { Tecnologia: 400, Manufatura: 300, Varejo: 238, Transporte: 188, Serviços: 124 },
    temDados: (state) => state.processado,
    temResultado: (state) => state.processado
  },

  actions: {
    adicionarErro({ linha = 'Arquivo', campo = 'arquivo', tipo, descricao, valor = '' }) {
      this.erros.push({
        id: `${linha}-${campo}-${tipo}-${this.erros.length}`,
        linha,
        campo: rotulos[campo] || campo,
        tipo,
        descricao,
        valor
      })
    },

    selecionarArquivo(file) {
      this.arquivo = file
      this.dadosOriginais = []
      this.dadosTratados = []
      this.erros = []
      this.processado = false
    },

    validarArquivo() {
      if (!this.arquivo) {
        this.adicionarErro({
          tipo: 'Arquivo não selecionado',
          descricao: 'Selecione uma planilha antes de processar.'
        })
        return false
      }

      const extensoesPermitidas = ['.xlsx', '.xls', '.csv']
      const arquivoValido = extensoesPermitidas.some((extensao) =>
        this.arquivo.name.toLowerCase().endsWith(extensao)
      )

      if (!arquivoValido) {
        this.adicionarErro({
          tipo: 'Formato inválido',
          descricao: 'Use um arquivo XLSX, XLS ou CSV.'
        })
        return false
      }

      return true
    },

    montarMapaDeColunas(colunas) {
      const normalizadas = new Map(colunas.map((coluna) => [normalizarChave(coluna), coluna]))

      return Object.fromEntries(Object.entries(ALIASES_DE_COLUNA).map(([campo, aliases]) => {
        const encontrada = aliases
          .map((alias) => normalizadas.get(normalizarChave(alias)))
          .find(Boolean)
        return [campo, encontrada]
      }))
    },

    validarLinha(linha, numeroLinha, mapaColunas) {
      const dados = {}

      Object.entries(mapaColunas).forEach(([campo, coluna]) => {
        dados[campo] = coluna ? linha[coluna] : ''
      })

      CAMPOS_OBRIGATORIOS.forEach((campo) => {
        if (!normalizarTexto(dados[campo])) {
          this.adicionarErro({
            linha: numeroLinha,
            campo,
            tipo: 'Campo obrigatório vazio',
            descricao: 'Este campo é obrigatório e não foi preenchido.'
          })
        }
      })

      Object.entries(dados).forEach(([campo, valor]) => {
        if (valor !== null && valor !== undefined && String(valor) !== String(valor).trim()) {
          this.adicionarErro({
            linha: numeroLinha,
            campo,
            tipo: 'Espaços desnecessários',
            descricao: 'Há espaços no início ou no fim do valor.',
            valor
          })
        }
      })

      const email = normalizarTexto(dados.email)
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        this.adicionarErro({
          linha: numeroLinha,
          campo: 'email',
          tipo: 'E-mail inválido',
          descricao: 'Informe um e-mail no formato nome@dominio.com.',
          valor: email
        })
      }

      const codigo = normalizarTexto(dados.codigo_cliente)
      if (codigo && !/^[A-Za-z0-9_-]+$/.test(codigo)) {
        this.adicionarErro({
          linha: numeroLinha,
          campo: 'codigo_cliente',
          tipo: 'Fora do padrão',
          descricao: 'O código deve usar apenas letras, números, hífen ou sublinhado.',
          valor: codigo
        })
      }

      const nivel = normalizarTexto(dados.nivel_cliente).toUpperCase()
      if (nivel && !['A', 'B', 'C'].includes(nivel)) {
        this.adicionarErro({
          linha: numeroLinha,
          campo: 'nivel_cliente',
          tipo: 'Fora do padrão',
          descricao: 'O nível do cliente deve ser A, B ou C.',
          valor: dados.nivel_cliente
        })
      }

      const faturamento = paraNumero(dados.faturamento_anual)
      if (normalizarTexto(dados.faturamento_anual) && (!Number.isFinite(faturamento) || faturamento < 0)) {
        this.adicionarErro({
          linha: numeroLinha,
          campo: 'faturamento_anual',
          tipo: 'Fora do padrão',
          descricao: 'O faturamento deve ser um número maior ou igual a zero.',
          valor: dados.faturamento_anual
        })
      }

      ;['nome_cliente', 'consultor', 'segmento'].forEach((campo) => {
        const valor = normalizarTexto(dados[campo])
        if (valor && valor !== textoPadronizado(valor)) {
          this.adicionarErro({
            linha: numeroLinha,
            campo,
            tipo: 'Padronização necessária',
            descricao: 'O texto possui espaçamentos internos inconsistentes.',
            valor: dados[campo]
          })
        }
      })

      return dados
    },

    verificarDuplicidades(registros) {
      const camposParaVerificar = ['codigo_cliente', 'email']

      camposParaVerificar.forEach((campo) => {
        const encontrados = new Map()

        registros.forEach(({ dados, numeroLinha }) => {
          const valor = normalizarChave(dados[campo])
          if (!valor) return
          const linhas = encontrados.get(valor) || []
          linhas.push(numeroLinha)
          encontrados.set(valor, linhas)
        })

        encontrados.forEach((linhas, valor) => {
          if (linhas.length < 2) return
          linhas.forEach((linha) => {
            this.adicionarErro({
              linha,
              campo,
              tipo: 'Registro duplicado',
              descricao: `O valor "${valor}" também aparece na(s) linha(s) ${linhas.filter((item) => item !== linha).join(', ')}.`,
              valor
            })
          })
        })
      })
    },

    tratarLinha(dados) {
      const faturamento = paraNumero(dados.faturamento_anual)
      const segmento = textoPadronizado(dados.segmento)
      const mapaSegmentos = {
        industria: 'Indústria',
        comercio: 'Comércio',
        servicos: 'Serviços',
        educacao: 'Educação',
        saude: 'Saúde',
        tecnologia: 'Tecnologia'
      }

      return {
        ...dados,
        codigo_cliente: textoPadronizado(dados.codigo_cliente),
        nome_cliente: textoPadronizado(dados.nome_cliente),
        cliente: textoPadronizado(dados.nome_cliente),
        email: textoPadronizado(dados.email),
        consultor: textoPadronizado(dados.consultor),
        segmento: mapaSegmentos[normalizarChave(segmento)] || segmento,
        nivel_cliente: textoPadronizado(dados.nivel_cliente).toUpperCase(),
        faturamento_anual: faturamento,
        faturamento
      }
    },

    async processarPlanilha() {
      this.erros = []
      if (!this.validarArquivo()) return

      this.carregando = true
      this.dadosOriginais = []
      this.dadosTratados = []
      this.processado = false

      try {
        const buffer = await this.arquivo.arrayBuffer()
        const workbook = XLSX.read(buffer, { cellDates: true })
        const primeiraAba = workbook.SheetNames[0]

        if (!primeiraAba) {
          this.adicionarErro({ tipo: 'Planilha vazia', descricao: 'O arquivo não possui nenhuma aba para leitura.' })
          this.processado = true
          return
        }

        const linhas = XLSX.utils.sheet_to_json(workbook.Sheets[primeiraAba], { defval: '' })
        if (!linhas.length) {
          this.adicionarErro({ tipo: 'Planilha vazia', descricao: 'A primeira aba não possui registros.' })
          this.processado = true
          return
        }

        const mapaColunas = this.montarMapaDeColunas(Object.keys(linhas[0]))
        CAMPOS_OBRIGATORIOS.filter((campo) => !mapaColunas[campo]).forEach((campo) => {
          this.adicionarErro({
            linha: 'Cabeçalho',
            campo,
            tipo: 'Coluna obrigatória ausente',
            descricao: `A coluna "${rotulos[campo]}" não foi encontrada na planilha.`
          })
        })

        const registros = linhas.map((linha, indice) => {
          const dados = this.validarLinha(linha, indice + 2, mapaColunas)
          return { dados, numeroLinha: indice + 2 }
        })

        this.verificarDuplicidades(registros)
        this.dadosOriginais = registros.map(({ dados, numeroLinha }) => ({ ...dados, numero_linha: numeroLinha }))
        this.dadosTratados = registros.map(({ dados }) => this.tratarLinha(dados))
        this.processado = true
      } catch (erro) {
        console.error(erro)
        this.adicionarErro({
          tipo: 'Falha de leitura',
          descricao: 'Não foi possível ler a planilha. Verifique se o arquivo não está corrompido.'
        })
        this.processado = true
      } finally {
        this.carregando = false
      }
    }
  }
})

