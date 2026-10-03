<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import Sidebar from './Sidebar.vue'

const sidebarRecolhida = ref(false)
const larguraJanela = ref(window.innerWidth)
const menuMobileAberto = ref(false)
const sidebarCompacta = computed(() => larguraJanela.value > 760 && (sidebarRecolhida.value || larguraJanela.value <= 1180))

function atualizarLargura() {
  larguraJanela.value = window.innerWidth
}

onMounted(() => window.addEventListener('resize', atualizarLargura))
onBeforeUnmount(() => window.removeEventListener('resize', atualizarLargura))
</script>

<template>
  <div class="app-shell">
    <Sidebar :collapsed="sidebarCompacta" :mobile-open="menuMobileAberto" @toggle="sidebarRecolhida = !sidebarRecolhida" @close="menuMobileAberto = false" />
    <button v-if="menuMobileAberto" class="mobile-backdrop" aria-label="Fechar menu" @click="menuMobileAberto = false"></button>
    <div :class="['app-content', { compact: sidebarCompacta }]">
      <header class="appbar"><button class="mobile-menu" aria-label="Abrir navegação" @click="menuMobileAberto = true"><i></i><i></i><i></i></button><p>CYRA / INTELIGÊNCIA DE DADOS</p><div class="account"><span class="avatar">AO</span><span>Ana Oliveira</span></div></header>
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.app-shell{min-height:100vh;background:#090b11;color:#eef1f6}.app-content{min-height:100vh;margin-left:256px;transition:margin-left .28s ease}.app-content.compact{margin-left:76px}.appbar{position:sticky;top:0;z-index:30;display:flex;align-items:center;justify-content:space-between;height:64px;padding:0 36px;border-bottom:1px solid #1c2431;background:rgba(9,11,17,.88);backdrop-filter:blur(16px)}.appbar p{color:#8894a8;font:10px ui-monospace,monospace;letter-spacing:.14em}.account{display:flex;align-items:center;gap:9px;color:#a9b3c2;font-size:12px}.avatar{display:grid;width:27px;height:27px;place-items:center;border:1px solid #657ac3;border-radius:50%;background:#253452;color:#eaf0ff;font-size:10px;font-weight:700}.mobile-menu,.mobile-backdrop{display:none}@media(max-width:760px){.app-content,.app-content.compact{margin-left:0}.appbar{padding:0 20px}.account span:last-child{display:none}.mobile-menu{display:grid;width:34px;height:34px;padding:8px;border:1px solid #34415b;border-radius:7px;background:#101827;place-content:center;gap:4px}.mobile-menu i{display:block;width:16px;height:1px;background:#c8d4ee}.mobile-backdrop{position:fixed;z-index:40;inset:0;display:block;border:0;background:rgba(0,0,0,.54)}}
</style>
