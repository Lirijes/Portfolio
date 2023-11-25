<script setup>
</script>

<template>
  <NavBar />
  <NuxtPage />
  <Footer />
</template>

<style lang="scss" >
@import './assets/scss/main.scss';

:root {
  --text-color: #{$textColor}; // special syntaxt for it to understand its not just a simple string
}

</style>