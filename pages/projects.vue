<script setup lang="ts">
</script>

<template>
    <div class="projects-page">
      <h1>projects.</h1>
      <ProjectCard :id="1" />
    </div>
</template>

<style lang="scss">
.projects-page {
  padding-top: 100px;
  background-color: rgb(180, 154, 154, 0.7); // opacity here to only be on the background color and not the content
}
</style>