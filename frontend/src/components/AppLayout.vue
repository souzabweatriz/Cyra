<template>
  <div class="app-shell">
    <header class="appbar">
      <router-link to="/dashboard" class="app-brand"><img src="/cti-insights-logo.svg" alt="Cyra"><span>Cyra</span></router-link>
      <nav class="app-nav"><router-link to="/dashboard" active-class="active">Visão geral</router-link><router-link to="/graficos" active-class="active">Evolução</router-link><router-link to="/relatorios" active-class="active">Relatórios</router-link><router-link to="/upload" active-class="active">Importar base</router-link></nav>
      <div class="account"><span class="avatar">AO</span><span>Ana Oliveira</span><button aria-label="Configurações">•••</button></div>
    </header>
    <router-view />
  </div>
</template>

<style scoped>
.app-shell{min-height:100vh;background:#090b11;color:#eef1f6}.appbar{position:sticky;top:0;z-index:30;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;height:64px;padding:0 36px;border-bottom:1px solid #1c2431;background:rgba(9,11,17,.9);backdrop-filter:blur(16px)}.app-brand{display:flex;align-items:center;gap:9px;color:#eef1f6;text-decoration:none;font-size:14px;font-weight:700}.app-brand img{width:24px;height:24px}.app-nav{display:flex;height:100%;align-items:center;gap:28px}.app-nav a{position:relative;display:flex;align-items:center;height:100%;color:#8894a8;text-decoration:none;font-size:13px}.app-nav a:hover{color:#dce2ec}.app-nav a.active{color:#f0f3f8}.app-nav a.active:after{position:absolute;right:0;bottom:0;left:0;height:2px;content:'';background:#5872c7}.account{justify-self:end;display:flex;align-items:center;gap:9px;color:#a9b3c2;font-size:12px}.avatar{display:grid;width:27px;height:27px;place-items:center;border:1px solid #657ac3;border-radius:50%;background:#253452;color:#eaf0ff;font-size:10px;font-weight:700}.account button{margin-left:6px;border:0;background:none;color:#8994a8;font-size:16px;letter-spacing:1px;cursor:pointer}@media(max-width:760px){.appbar{grid-template-columns:auto 1fr;padding:0 18px}.app-nav{justify-content:end;gap:16px;overflow:auto}.app-nav a{font-size:12px;white-space:nowrap}.account{display:none}}
</style>
