<script setup lang="ts">
import { fetchProject } from "../server/api";
import type { Project } from "../server/api";
import Carousel from "./Carousel.vue";

const props = defineProps({
  id: {
    type: Number as PropType<number>,
    required: true,
  },
});
const project = ref<Project | null>(null);
const currentImageIndex = ref(0);

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

const projectImages = computed<string[]>(() => {
  const images: string[] = [];
  for (let i = 1; i <= 6; i++) {
    const imageProperty = `image${i}` as keyof Project;
    const imageUrl = project.value && project.value[imageProperty];
    if (imageUrl && imageUrl !== "") {
      images.push(String(imageUrl));
    }
  }
  return images;
});
</script>

<template>
  <div v-if="project" class="project-card">
    <div class="container">
      <h5 class="project-card-title">
        {{ project.projectTitle.toLowerCase() }}
      </h5>
      <a
        :href="project.projectUrl.toLocaleLowerCase()"
        class="project-card-url"
        target="_blank"
        >{{ project.projectUrl.toLocaleLowerCase() }}</a
      >
      <p class="project-card-description">{{ project.description }}</p>
      <Carousel
        class="img-carousel"
        :images="projectImages"
        :currentIndex="currentImageIndex"
      >
        <template v-slot:carousel-item="{ currentIndex }">
          <div class="carousel-wrapper">
            <div
              class="image-container"
              v-for="(image, index) in projectImages"
              :key="index"
              :style="{ transform: `translateX(${-currentIndex * 100}%)` }"
            >
              <img class="one-img" :src="image" :alt="`Image ${index + 1}`" />
            </div>
          </div>
        </template>
      </Carousel>
      <NuxtLink :to="`/project-detail/${project.id}`" class="project-card-link"
        >read more about this project
        <font-awesome-icon icon="fa-solid fa-chevron-right"
      /></NuxtLink>
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

    .img-carousel {
      height: 200px;
      overflow: hidden;

      @include mx {
        height: 400px;
      }

      @include xl {
        height: 600px;
      }

      .carousel-wrapper {
        display: block;
        width: 100%;

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

    .project-card-link {
      background-color: rgb(180, 154, 154, 0.5);
      font-size: 14px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      padding: 2.5px 20px;
      cursor: pointer;
      margin: 15px 0;
      width: 100%;
      text-align: center;

      &:hover {
        background-color: rgb(180, 154, 154, 1);
        text-decoration: none;
      }
    }
  }
}
</style>
