<script setup lang="ts">
import { fetchProject } from "../composables/useProjectFetch";
import { getImageUrl } from '../utils/helpers'; 
import type { Project } from "../composables/useProjectFetch";

const props = defineProps({
  id: {
    type: Number as PropType<number>,
    required: true,
  },
});

const project = ref<Project | null>(null);

const loadProject = async (id: number) => {
  try {
    project.value = await fetchProject(id.toString());
  } catch (error) {
    console.error("Error fetching project:", error);
  }
};

watch(() => props.id, (newId) => {
  if (newId !== null) {
    loadProject(newId);
  }
});

onMounted(() => {
  if (props.id !== null) {
    loadProject(props.id);
  }
});
</script>

<template>
  <div v-if="project" class="project-card">
    <div class="container">
      <!-- Header: Title & Links -->
      <div class="project-card-header">
        <h5 class="project-card-title">{{ project.projectTitle.toLowerCase() }}</h5>
        <div class="project-card-header-icons">
          <a :href="project.githubUrl" target="_blank">
            <font-awesome-icon :icon="['fab', 'github']" class="icon-space" />
          </a>
          <a :href="project.projectUrl" target="_blank">
            <font-awesome-icon :icon="['fas', 'globe']" class="icon-space" />
          </a>
        </div>
      </div>
      <!-- Status -->
      <div class="project-card-status" v-if="project.status">
        <p>status: <span>{{ project.status.toLowerCase() }}</span></p>
      </div>
      <!-- Description -->
      <p class="project-card-description">{{ project.description }}</p>
      <!-- Techstack -->
      <div class="project-card-utilities" v-if="project.projectUtilities.length">
        <h6>techstack:</h6>
        <ul>
          <li v-for="utility in project.projectUtilities" :key="utility.id">
            {{ utility.utility.name }} 
          </li>
        </ul>
      </div>
      <!-- Images -->
      <div class="image-container" v-if="project.image1">
        <img class="one-img" :src="getImageUrl(project.image1)" alt="Project Image" />
        <img v-if="project.image2" class="project-img" :src="getImageUrl(project.image2)" alt="Project Image" />
        <img v-if="project.image3" class="project-img" :src="getImageUrl(project.image3)" alt="Project Image" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/scss/mixins.scss";

.project-card {
  .container {
    background-color: #f5f5f5;
    border-radius: 10px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .project-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .project-card-title {
        font-size: 16px;
        font-weight: bold;

        @include mx {
          font-size: 22px;
          color: #333;
        }
      }

      .project-card-header-icons {
        display: flex;
        align-items: center;
        gap: 10px;

        .icon-space {
          margin-left: 10px;
          font-size: 20px;
          color: #333;
          transition: transform 0.2s;

          &:hover {
            transform: scale(1.1);
            color: #f77c7c;
          }
        }
      }
    }
    .project-card-status {
      font-style: italic;
      font-size: 11px;
      color: #555;
    }
    .project-card-description {
      font-size: 14px;
      color: #333;
      @include mx {
        font-size: 14px;
      }
    }
    .project-card-utilities {
      border-radius: 8px;
      flex: 1;
      
      h6 {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 2px;

        @include mx {
          font-size: 15px;
          color: #333;
        }
      }

      ul {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        font-size: 12px;

        @include mx {
          font-size: 14px;
        }
      }
    }
    .image-container {
      display: flex;
      gap: 8px;

      .one-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
      }

      .project-img {
        width: 100%;
        max-width: 250px;
        height: auto;
        border-radius: 10px;
      }
    }
  }
}
</style>