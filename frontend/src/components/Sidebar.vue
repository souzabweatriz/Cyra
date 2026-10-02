<script setup>
defineProps({ collapsed: { type: Boolean, default: false } })
const emit = defineEmits(['toggle'])

const links = [
  ['dashboard', '/dashboard', 'Visão geral', 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z'],
  ['upload', '/upload', 'Importar base', 'M12 16V4m-4 4 4-4 4 4M5 15v4h14v-4'],
  ['relatorios', '/relatorios', 'Relatórios', 'M7 3h10l4 4v14H7zM17 3v5h5M10 13h7M10 17h5'],
  ['graficos', '/graficos', 'Indicadores', 'M4 20V10m6 10V4m6 16v-7m6 7V7M2 20h20']
]
</script>

<template>
  <aside :class="[
    'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/[0.09] bg-[#101313]/92 backdrop-blur-xl transition-all duration-300',
    collapsed ? 'w-[76px]' : 'w-64'
  ]">
    <div class="flex h-20 items-center border-b border-white/[0.09] px-4">
      <router-link to="/dashboard" class="flex min-w-0 items-center gap-3">
        <img src="/cti-insights-logo.svg" alt="Cyra" class="h-10 w-10 shrink-0" />
        <div v-if="!collapsed" class="min-w-0">
          <p class="truncate text-sm font-bold tracking-[.08em] text-[#f2efe7]">Cyra</p>
          <p class="mt-0.5 text-[9px] font-bold uppercase tracking-[.16em] text-[#85908b]">Data analytics</p>
        </div>
      </router-link>
    </div>

    <nav class="flex-1 px-3 py-6">
      <p v-if="!collapsed" class="mb-3 px-3 text-[9px] font-bold uppercase tracking-[.18em] text-[#68716d]">Navegação</p>
      <router-link
        v-for="([nome, destino, rotulo, caminho]) in links"
        :key="nome"
        :to="destino"
        active-class=""
        exact-active-class="!border-[#6fae55] !bg-[#6fae55]/[.10] !text-[#b7df9c]"
        class="group mb-1 flex items-center gap-3 border-l-2 border-transparent px-3 py-3 text-sm text-[#929a96] transition hover:bg-white/[0.04] hover:text-[#e8ece4]"
      >
        <svg class="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path :d="caminho" /></svg>
        <span v-if="!collapsed" class="whitespace-nowrap">{{ rotulo }}</span>
      </router-link>
    </nav>

    <div class="border-t border-white/[0.09] p-3">
      <div v-if="!collapsed" class="mb-2 border border-white/[0.08] bg-white/[0.025] p-3">
        <p class="text-xs font-semibold text-[#e8ece4]">Usuário:</p>
      </div>
      <button @click="emit('toggle')" class="flex w-full items-center gap-3 px-3 py-3 text-xs font-bold uppercase tracking-[.1em] text-[#7f8984] transition hover:bg-white/[0.04] hover:text-[#b7df9c]">
        <svg :class="['h-4 w-4 transition-transform', collapsed ? 'rotate-180' : '']" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m15 18-6-6 6-6" /></svg>
        <span v-if="!collapsed">Recolher</span>
      </button>
    </div>
  </aside>
</template>

