<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

defineProps({ collapsed: { type: Boolean, default: false }, mobileOpen: { type: Boolean, default: false } })
const emit = defineEmits(['toggle', 'close'])
const router = useRouter()
const auth = useAuthStore()

const links = [
  ['dashboard', '/dashboard', 'Visão geral', 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z'],
  ['upload', '/upload', 'Importar base', 'M12 16V4m-4 4 4-4 4 4M5 15v4h14v-4'],
  ['relatorios', '/relatorios', 'Relatórios', 'M7 3h10l4 4v14H7zM17 3v5h5M10 13h7M10 17h5'],
  ['graficos', '/graficos', 'Indicadores', 'M4 20V10m6 10V4m6 16v-7m6 7V7M2 20h20']
]

function sair() {
  auth.logout()
  emit('close')
  router.push('/')
}
</script>

<template>
  <aside :class="[
    'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-[#202b40] bg-[#0c121e]/95 backdrop-blur-xl transition-all duration-300',
    collapsed ? 'w-[76px]' : 'w-64',
    mobileOpen ? 'mobile-open' : ''
  ]">
    <div class="flex h-20 items-center border-b border-[#202b40] px-4">
      <router-link to="/dashboard" class="flex min-w-0 items-center gap-3">
        <img src="/cyra-logo.jpg" alt="Logo Cyra" class="h-10 w-10 shrink-0 rounded object-cover" />
        <div v-if="!collapsed" class="min-w-0">
          <p class="truncate text-sm font-bold tracking-[.08em] text-[#eef2f8]">Cyra</p>
          <p class="mt-0.5 text-[9px] font-bold uppercase tracking-[.16em] text-[#71809a]">Inteligência de dados</p>
        </div>
      </router-link>
    </div>

    <nav class="flex-1 px-3 py-6">
      <p v-if="!collapsed" class="mb-3 px-3 text-[9px] font-bold uppercase tracking-[.18em] text-[#71809a]">Navegação</p>
      <router-link
        v-for="([nome, destino, rotulo, caminho]) in links"
        :key="nome"
        :to="destino"
        @click="emit('close')"
        active-class=""
        exact-active-class="!border-[#536fce] !bg-[#536fce]/[.14] !text-[#e4ebff]"
        class="group mb-1 flex items-center gap-3 border-l-2 border-transparent px-3 py-3 text-sm text-[#98a4b8] transition hover:bg-[#ffffff]/[0.045] hover:text-[#eef2f8]"
      >
        <svg class="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path :d="caminho" /></svg>
        <span v-if="!collapsed" class="whitespace-nowrap">{{ rotulo }}</span>
      </router-link>
    </nav>

    <div class="border-t border-[#202b40] p-3">
      <div v-if="!collapsed" class="mb-2 border border-[#26334b] bg-[#111a29] p-3">
        <p class="text-xs font-semibold text-[#d8e1f0]">Usuário:</p>
      </div>
      <button v-if="!mobileOpen" @click="emit('toggle')" class="flex w-full items-center gap-3 px-3 py-3 text-xs font-bold uppercase tracking-[.1em] text-[#8290a8] transition hover:bg-[#ffffff]/[0.045] hover:text-[#cbd8f4]">
        <svg :class="['h-4 w-4 transition-transform', collapsed ? 'rotate-180' : '']" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m15 18-6-6 6-6" /></svg>
        <span v-if="!collapsed">Recolher</span>
      </button>
      <button @click="sair" class="mt-1 flex w-full items-center gap-3 px-3 py-3 text-xs font-bold uppercase tracking-[.1em] text-[#9da6b6] transition hover:bg-[#ffffff]/[0.045] hover:text-white">
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 17l5-5-5-5M15 12H3M21 4v16H9" /></svg>
        <span v-if="!collapsed">Sair</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
@media (max-width: 760px) {
  aside { display: flex; width: min(270px, 84vw) !important; transform: translateX(-105%); transition: transform .28s ease; }
  aside.mobile-open { transform: translateX(0); box-shadow: 20px 0 40px rgba(0,0,0,.35); }
}
</style>

