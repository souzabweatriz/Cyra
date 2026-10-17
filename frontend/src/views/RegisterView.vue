<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const auth = useAuthStore()
const router = useRouter()
const nome = ref('')
const email = ref('')
const senha = ref('')
const confirmar = ref('')
const erro = ref('')
const carregando = ref(false)
const senhaForte = computed(() => /^(?=.*[A-Za-z])(?=.*\d).{8,72}$/.test(senha.value))

async function cadastrar() {
  erro.value = ''
  if (!senhaForte.value) { erro.value = 'A senha deve ter de 8 a 72 caracteres, com letras e números.'; return }
  if (senha.value !== confirmar.value) { erro.value = 'As senhas não conferem.'; return }
  carregando.value = true
  try {
    await auth.register(nome.value.trim(), email.value.trim(), senha.value)
    router.push('/login')
  } catch (error) {
    const dados = error.response?.data
    erro.value = dados?.campos ? Object.values(dados.campos).join(' ') : (dados?.mensagem || 'Não foi possível cadastrar. Tente novamente.')
  } finally { carregando.value = false }
}
</script>

<template>
  <main class="register-page"><section class="register-card"><router-link class="back" to="/login">← Voltar para entrar</router-link><div class="identity"><img src="/cyra-logo.jpg" alt="Logo Cyra"><span>Cyra</span></div><h1>Criar conta</h1><p>Crie suas credenciais para acessar a plataforma.</p><form @submit.prevent="cadastrar"><label>NOME<input v-model="nome" type="text" autocomplete="name" maxlength="100" required></label><label>E-MAIL CORPORATIVO<input v-model="email" type="email" autocomplete="username" maxlength="150" required></label><label>SENHA<input v-model="senha" type="password" autocomplete="new-password" required></label><small>Mínimo de 8 caracteres, com letras e números.</small><label>CONFIRMAR SENHA<input v-model="confirmar" type="password" autocomplete="new-password" required></label><p v-if="erro" class="error" role="alert">{{ erro }}</p><button :disabled="carregando">{{ carregando ? 'Cadastrando...' : 'Cadastrar' }}</button></form><p class="login-link">Já tem conta? <router-link to="/login">Entrar</router-link></p></section></main>
</template>

<style scoped>
.register-page{display:grid;min-height:100vh;padding:32px;place-items:center;background:#080c15;color:#eef1fa}.register-card{width:min(460px,100%);padding:34px;border:1px solid #2b3448;border-radius:14px;background:#0d121d;box-shadow:0 24px 55px #0004}.back{color:#9aa6bc;font-size:12px;text-decoration:none}.identity{display:flex;align-items:center;gap:9px;margin:27px 0 22px;font-weight:700}.identity img{width:38px;height:26px;border-radius:4px;object-fit:cover}.register-card h1{margin:0;font-size:29px;letter-spacing:-.04em}.register-card>p{color:#aeb8ca;line-height:1.55}.register-card label{display:block;margin-top:22px;color:#aab2c2;font:11px monospace;letter-spacing:.13em}.register-card input{box-sizing:border-box;width:100%;margin-top:8px;padding:13px 15px;border:1px solid #2b3448;border-radius:9px;background:#191f2e;color:#eef1fa;font:14px system-ui}.register-card small{display:block;margin-top:8px;color:#8793a9;font-size:11px}.register-card button{width:100%;margin-top:26px;padding:14px;border:1px solid #687fca;border-radius:8px;background:#415ba8;color:#fff;font-weight:700}.register-card button:disabled{opacity:.65;cursor:wait}.error{color:#f4a4af!important;font-size:13px}.login-link{margin:18px 0 0;text-align:center;font-size:13px}.login-link a{color:#69d6c3;text-decoration:none}@media(max-width:520px){.register-page{padding:20px}.register-card{padding:26px 22px}}
</style>
