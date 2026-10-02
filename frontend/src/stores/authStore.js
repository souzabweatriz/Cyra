import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  // STATE
  // Guarda os dados de autenticação usados pela aplicação.
  state: () => ({
    logado: localStorage.getItem('cti_logado') === 'true',

    usuario:
      localStorage.getItem('cti_usuario') || ''
  }),

  // GETTERS
  // Calculam informações a partir do state.
  getters: {
    nomeExibicao: (state) => {
      return state.usuario || 'Usuário'
    },

    estaLogado: (state) => {
      return state.logado
    }
  },

  // ACTIONS
  // Executam ações que alteram o state.
  actions: {
    login(usuario, senha) {
      // Para a atividade de front-end,
      // qualquer usuário e senha preenchidos são aceitos.
      if (!usuario || !senha) {
        return false
      }

      this.logado = true
      this.usuario = usuario

      localStorage.setItem(
        'cti_logado',
        'true'
      )

      localStorage.setItem(
        'cti_usuario',
        usuario
      )

      return true
    },

    logout() {
      this.logado = false
      this.usuario = ''

      localStorage.removeItem(
        'cti_logado'
      )

      localStorage.removeItem(
        'cti_usuario'
      )
    }
  }
})
