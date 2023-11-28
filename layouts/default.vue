<script lang="ts">
</script>

<template>
    <div class="default-layout">
        <NavBar />
        <slot />
        <Footer />
    </div>
</template>

<style lang="scss" >
@import './assets/scss/main.scss';
@import './assets/scss/mixins.scss';
@import './assets/scss/variables.scss';

:root {
  --text-color: #{$textColor}; // special syntaxt for it to understand its not just a simple string
  --hover-color: #{$hoverColor};
}

.default-layout {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.default-layout :deep(.page) {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

</style>