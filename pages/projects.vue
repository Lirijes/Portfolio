<script setup lang="ts">
import { fetchProjects } from '~/server/api';
import type { Project } from '~/server/api';

const projects = ref<Project[]>([]);

onMounted(async () => {
  try {
    projects.value = await fetchProjects();
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
});
</script>

<template>
    <div class="projects-page">
      <div class="container">
        <h1 class="page-title">projects.</h1>
        <div v-if="projects.length > 0">
          <ProjectCard v-for="project in projects" :key="project.id" :id="project.id" />
        </div>
        <div v-else>
          <p>No projects available.</p>
        </div>
      </div>
    </div>
</template>

<style lang="scss">
.projects-page {
  padding-top: 100px;
  background-color: rgb(180, 154, 154, 0.7); // opacity here to only be on the background color and not the content

  .container {
      .page-title {
        font-size: 22px;
        display: flex;
        justify-content: center;
    }
  }
}
</style>