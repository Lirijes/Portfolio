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
        <div class="project-list-container">
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
        <div class="project-detail" v-if="selectedProjectId !== null">
          <ProjectCard :id="selectedProjectId" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/scss/mixins.scss";

.projects-page {
  min-height: 100vh;
  padding-top: 100px;
  padding-bottom: 50px;
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
      justify-content: space-between;

      @include mx {
        justify-content: center;
        gap: 40px;
      }

      .project-list-container {
        width: 50px;
        list-style-type: none;
        padding: 0;
        text-transform: lowercase;

        @include mx {
          width: 200px;
        }

        .project-item {
          cursor: pointer;
          padding: 10px;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background-color: #f5f5f5;
          border-radius: 10px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
          font-size: 14px;
          transition: all 0.2s ease-in-out;

          &:hover {
            transform: scale(1.1);
            color: rgb(180, 154, 154);
          }

          &.selected {
            color: rgb(180, 154, 154);
          }

          @include mx {
            justify-content: flex-start;
          }

          .project-title {
            display: none;

            @include mx {
              display: block;
            }
          }

          .project-icon {
            font-size: 18px;
          }
        }
      }

      .project-detail {
        width: 80%;

        @include mx {
          width: 70%;
        }
      }
    }
  }
}
</style>
