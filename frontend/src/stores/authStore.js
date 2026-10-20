import { defineStore } from 'pinia'
import api from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    usuario: JSON.parse(localStorage.getItem('cyra_usuario') || 'null'),
    carregando: false
  }),

  getters: {
    estaLogado: (state) => Boolean(state.token),
    nomeExibicao: (state) => state.usuario?.nome || 'Usuário'
  },

  actions: {
    login(email) {
      // Sprint atual: acesso demonstrativo sem integração ou validação de credenciais.
      // A autenticação real será reativada quando a API estiver disponível.
      const nome = email?.trim().split('@')[0] || 'Visitante'
      this.token = 'acesso-demonstracao'
      this.usuario = { nome, perfil: 'DEMO', email: email?.trim() || null }
      localStorage.setItem('token', this.token)
      localStorage.setItem('cyra_usuario', JSON.stringify(this.usuario))
      return this.usuario
    },

    async register(nome, email, senha) {
      return api.post('/auth/register', { nome, email, senha })
    },

    async carregarPerfil() {
      if (!this.token) return null
      const { data } = await api.get('/auth/me')
      this.usuario = data
      localStorage.setItem('cyra_usuario', JSON.stringify(data))
      return data
    },

    logout() {
      this.token = ''
      this.usuario = null
      localStorage.removeItem('token')
      localStorage.removeItem('cyra_usuario')
    }
  }
})
