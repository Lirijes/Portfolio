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
      <div class="project-card-header">
        <h5 class="project-card-title">
          {{ project.projectTitle.toLowerCase() }}
        </h5>
        <div class="project-card-header-icons">
          <a :href="project.githubUrl" target="_blank">
            <font-awesome-icon :icon="['fab', 'github']" class="icon-space" />
          </a>
          <a :href="project.projectUrl" target="_blank">
            <font-awesome-icon :icon="['fas', 'globe']" class="icon-space" />
          </a>
        </div>
      </div>
      <a
        :href="project.projectUrl.toLowerCase()"
        class="project-card-url"
        target="_blank"
      >
        {{ project.projectUrl.toLowerCase() }}
      </a>
      <p class="project-card-description">{{ project.description }}</p>
      <div class="image-container" v-if="project.image1">
        <img class="one-img" :src="getImageUrl(project.image1)" alt="Project Image" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/scss/mixins.scss";

.project-card {
  .container {
    background-color: #f5f5f5;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    .project-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0px;

      .project-card-title {
        font-size: 16px;
        font-weight: bold;

        @include mx {
          font-size: 22px;
        }
      }

      .project-card-header-icons {
        display: flex;
        align-items: center;

        .icon-space {
          margin-left: 10px;
          font-size: 20px;
          color: #333;
        }
      }
    }
    .project-card-url {
      font-style: italic;
      font-size: 11px;
    }

    .project-card-description {
      margin: 10px 0;
      font-size: 12px;

      @include mx {
        font-size: 14px;
      }
    }

    .image-container {
      height: 100%;
      padding-bottom: 10px;

      .one-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
      }
    }
  }
}
</style>