<script setup lang="ts">
import type { Project } from '~/server/api.ts';
import { fetchProjects } from '~/server/api.ts';

const projects = ref<Project[]>([]);
const numberOfProjects = computed(() => projects.value.length);

const fetchData = async () => {
  try {
    projects.value = await fetchProjects();
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};

</script>

<template>
    <div>
        <h1>Projects List</h1>
        <button @click="fetchData">Fetch projects</button>
        <p>{{ numberOfProjects }}</p>
        <ul class="project-list">
            <li v-for="project in projects" :key="`project-id-${project.id}`">
                <input type="checkbox" />
                {{ project.projectTitle }}
            </li>
        </ul>
    </div>
</template>
  
<style>
.project-list {
    list-style: none;
    padding: 0;
}
</style>