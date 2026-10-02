<template>
  <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">

    <!-- Glow superior -->
    <div
      class="
        absolute
        left-1/2
        top-[-350px]
        h-[700px]
        w-[700px]
        -translate-x-1/2
        rounded-full
        bg-sky-500/10
        blur-[160px]
      "
    ></div>

    <!-- Glow lateral -->
    <div
      class="
        absolute
        right-[-250px]
        top-[35%]
        h-[500px]
        w-[500px]
        rounded-full
        bg-blue-600/10
        blur-[150px]
      "
    ></div>

    <!-- Glow inferior -->
    <div
      class="
        absolute
        bottom-[-300px]
        left-[20%]
        h-[500px]
        w-[500px]
        rounded-full
        bg-cyan-400/5
        blur-[150px]
      "
    ></div>

  </div>
</template>
