<script setup lang="ts">
import { fetchProjects } from "~/composables/useProjectFetch";
import type { Project } from "~/composables/useProjectFetch";

const projects = ref<Project[]>([]);
const selectedProjectId = ref<number | null>(null);
const selectedProject = ref<Project | null>(null);

const selectProject = async (id: number) => {
  selectedProjectId.value = id;
  if (id !== null) {
    selectedProject.value = await fetchProject(id.toString());
  }
};

onMounted(async () => {
  try {
    projects.value = await fetchProjects();
    if (projects.value.length > 0) {
      selectProject(projects.value[0].id); 
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
});
</script>

<template>
  <div class="projects-page">
    <div class="container">
      <h1 class="page-title">projects.</h1>
      <div class="content">
        <div class="project-list">
          <ul class="project-list">
            <li
              v-for="project in projects"
              :key="project.id"
              @click="selectProject(project.id)"
              :class="{ 'project-item': true, 'selected': project.id === selectedProjectId }"
            >
              {{ project.projectTitle }}
            </li>
          </ul>
        </div>
        <div class="project-detail" v-if="selectedProjectId !== null">
          <ProjectCard :id="selectedProjectId" />
        </div>
      </div>

      <div v-if="projects.length > 0">
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :id="project.id"
        />
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
  background-color: rgb(
    180,
    154,
    154,
    0.7
  ); // opacity here to only be on the background color and not the content

  .container {
    .page-title {
      font-size: 22px;
      display: flex;
      justify-content: center;
    }

    .content {
      display: flex;

      .project-list {
        width: 30%;
        padding-right: 20px;
        list-style-type: none;
        padding: 0;

        .project-item {
          cursor: pointer;
          padding: 10px;
          margin-bottom: 5px;
          background-color: #f5f5f5;
          border-radius: 5px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        }

        .project-item:hover {
          background-color: #e0e0e0;
        }

        .selected {
          background-color: #d0d0d0;
          font-weight: bold;
        }
      }

      .project-detail {
        width: 70%;
      }
    }
  }
}
</style>
