<script setup lang="ts">
import { ref, onMounted } from 'vue';
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

onMounted(async () => {
  try {
    if (props.id) {
      project.value = await fetchProject(props.id.toString());
    } else {
      console.error("No project ID provided.");
    }
  } catch (error) {
    console.error("Error fetching project:", error);
  }
});
</script>

<template>
  <div v-if="project" class="project-card">
    <div class="container">
      <h5 class="project-card-title">
        {{ project.projectTitle.toLowerCase() }}
      </h5>
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
  margin: 30px 0;

  .container {
    background-color: #f5f5f5;
    width: 90%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    .project-card-title {
      padding: 10px 0;
      font-weight: bold;
    }

    .project-card-url {
      margin: 10px 0;
      font-style: italic;
      font-size: 12px;
    }

    .project-card-description {
      margin: 10px 0;
    }

    .image-container {
      height: 100%;

      .one-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>