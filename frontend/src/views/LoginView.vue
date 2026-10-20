<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const email = ref('')
const senha = ref('')
const mostrarSenha = ref(false)

function entrar() {
  auth.login(email.value)
  router.push(route.query.redirect || '/dashboard')
}
</script>

<template>
  <main class="login">
    <section class="art">
      <router-link class="brand" to="/"><img src="/cyra-logo.jpg" alt="Logo Cyra">Cyra</router-link>
      <div class="message">
        <h1>Seus dados têm mais a dizer.</h1>
        <p>Transforme informações de clientes em decisões estratégicas.</p>
      </div>
    </section>
    <section class="form">
      <form @submit.prevent="entrar">
        <router-link to="/" class="back">← Voltar para a página inicial</router-link>
        <h1>Entrar na plataforma</h1>
        <p>Acesso demonstrativo: preencha os campos se desejar ou entre diretamente.</p>
        <label>E-MAIL CORPORATIVO<input v-model="email" type="text" autocomplete="username"></label>
        <label>SENHA<span><input v-model="senha" :type="mostrarSenha ? 'text' : 'password'"
              autocomplete="current-password"><button type="button"
              @click="mostrarSenha = !mostrarSenha">◉</button></span></label>
        <button class="enter">Entrar</button>
        <p class="register">Não tem conta? <router-link to="/cadastro">Cadastre-se</router-link></p>
      </form>
    </section>
  </main>
</template>

<style scoped>
.login {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  background: #080c15;
  color: #eef1fa
}

.art {
  position: relative;
  overflow: hidden;
  padding: 54px 62px;
  border-right: 1px solid #202737;
  background-image: linear-gradient(90deg, rgba(8, 12, 21, .28), rgba(8, 12, 21, .72)), url('/login-map.jpg');
  background-position: center;
  background-size: cover
}

.art::after {
  position: absolute;
  inset: 0;
  content: '';
  background: linear-gradient(0deg, rgba(8, 12, 21, .52), transparent 52%);
  pointer-events: none
}

.brand,
.message {
  position: relative;
  z-index: 1
}

.brand {
  display: flex;
  gap: 10px;
  align-items: center;
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  font-weight: 700
}

.brand img {
  width: 38px;
  height: 26px;
  object-fit: cover;
  border-radius: 4px
}

.message {
  position: absolute;
  bottom: 55px;
  max-width: 390px
}

.message h1 {
  font-size: 42px;
  line-height: 1.05;
  letter-spacing: -.05em
}

.message p,
.form>form>p {
  color: #c0c8d7;
  line-height: 1.6
}

.form {
  display: grid;
  place-items: center;
  padding: 30px
}

.form form {
  width: min(420px, 100%);
  padding: 34px;
  border: 1px solid #2b3448;
  border-radius: 14px;
  background: #0d121d;
  box-shadow: 0 24px 55px #0004
}

.back {
  display: inline-block;
  margin-bottom: 30px;
  color: #9aa6bc;
  text-decoration: none;
  font-size: 12px
}

.back:hover {
  color: #fff
}

.form h1 {
  margin: 0;
  font-size: 28px
}

.form label {
  display: block;
  margin-top: 30px;
  color: #aab2c2;
  font: 11px monospace;
  letter-spacing: .13em
}

.form input {
  box-sizing: border-box;
  width: 100%;
  margin-top: 9px;
  padding: 14px 16px;
  border: 1px solid #2b3448;
  border-radius: 10px;
  background: #191f2e;
  color: #eef1fa;
  font: 14px system-ui
}

.form label span {
  position: relative;
  display: block
}

.form label button {
  position: absolute;
  right: 12px;
  top: 16px;
  border: 0;
  background: none;
  color: #768099
}

.enter {
  display: block;
  width: 100%;
  margin-top: 28px;
  padding: 14px;
  border: 1px solid #687fca;
  border-radius: 8px;
  background: #415ba8;
  color: #fff;
  text-align: center;
  text-decoration: none;
  font-weight: 700;
  transition: .2s
}

.enter:hover {
  background: #4c67b5;
  transform: translateY(-2px)
}

.register {
  margin: 18px 0 0;
  text-align: center;
  font-size: 13px
}

.register a {
  color: #69d6c3;
  text-decoration: none
}

@media(max-width:760px) {
  .login {
    display: block
  }

  .art {
    min-height: 300px;
    padding: 30px
  }

  .message {
    bottom: 25px
  }

  .message h1 {
    font-size: 32px
  }

  .form {
    padding: 45px 24px
  }

  .form form {
    padding: 26px
  }
}
</style>