<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import MenuView from './views/MenuView.vue';
</script>

<template>
  <header>
    <MenuView />
  </header>

  <RouterView />
</template>
