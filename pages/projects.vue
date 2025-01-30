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
      <div class="grid-container">
        <!-- Project List -->
        <div class="grid-item project-list-container">
          <ul class="project-list">
            <li
              v-for="project in projects"
              :key="project.id"
              @click="selectProject(project.id)"
              :class="{ 'project-item': true, 'selected': project.id === selectedProjectId }"
              :title="project.projectTitle"
            >
              <font-awesome-icon 
                :icon="project.id === selectedProjectId ? ['fas', 'caret-right'] : ['fas', 'caret-down']"
                class="project-icon"
              />
              <span class="project-title">{{ project.projectTitle }}</span>
            </li>
          </ul>
        </div>

        <!-- Project Details -->
        <div class="grid-item project-detail" v-if="selectedProjectId !== null">
          <ProjectCard :id="selectedProjectId" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/scss/mixins.scss";

.projects-page {
  padding: 100px 20px;
  background-color: rgba(180, 154, 154, 0.7);

  .container {
    width: 100%; 
    max-width: 100%;
    padding: 0 20px;

    .page-title {
      font-size: 22px;
      text-align: center;
      margin-bottom: 20px;
    }

    .grid-container {
      display: grid;
      grid-template-columns: 1fr 3fr; // List takes 1/4, details take 3/
      gap: 20px;

      @media (max-width: 1024px) {
        grid-template-columns: 1fr; 
      }

      .grid-item {
        background-color: #f5f5f5;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      }

      .project-list-container {
        .project-list {
          list-style: none;
          padding: 0;
          margin: 0;

          .project-item {
            cursor: pointer;
            padding: 10px 15px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            background-color: #fff;
            border-radius: 5px;
            transition: transform 0.2s ease-in-out;

            &:hover {
              transform: scale(1.05);
              background-color: rgb(180, 154, 154, 0.1);
            }

            &.selected {
              background-color: rgb(180, 154, 154, 0.2);
            }

            .project-icon {
              font-size: 16px;
            }

            .project-title {
              font-size: 14px;
              text-transform: capitalize;
            }
          }
        }
      }

      .project-detail {
        overflow: hidden;
        display: flex;
        flex-direction: column;

        @media (max-width: 1024px) {
          margin-top: 20px; 
        }
      }
    }
  }
}
</style>
