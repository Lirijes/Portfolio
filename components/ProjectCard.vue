<script lang="ts">
import { fetchProject } from '../server/api';
import type { Project } from '../server/api';
import Carousel from './Carousel.vue';

export default {
  components: {
    Carousel,
  },
  props: ['id'],
  setup(props) {
    const state = ref<Project | null>(null);
    const currentImageIndex = ref(0);

    onMounted(async () => {
      try {
        if (props.id) {
          state.value = await fetchProject(props.id);
        } else {
          console.error('No project ID provided.');
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    });

    const projectImages = computed<string[]>(() => {
      const images: string[] = [];
      for (let i = 1; i <= 6; i++) {
        const imageProperty = `image${i}` as keyof Project;
        const imageUrl = state.value && state.value[imageProperty];
        if (imageUrl && imageUrl !== "") {
          images.push(String(imageUrl));
        }
      }
      console.log('Project Images:', images);
      return images;

    });
    return {
      state,
      projectImages,
      currentImageIndex,
    };
  },
};
</script>

<template>
    <div  v-if="state" class="project-card">
        <div class="container">
            <h2 class="project-card-title">{{ state.projectTitle }}</h2>
            <p class="project-card-url">link to github name and icon</p>
            <p class="project-card-description">{{ state.description }}</p>
            <Carousel :images="projectImages" :currentIndex="currentImageIndex">
              <template v-slot:carousel-item="{ currentIndex }">
                <div v-for="(image, index) in projectImages" :key="index" :style="{ transform: `translateX(${-currentIndex * 100}%)` }">
                  <img :src="image" :alt="`Image ${index + 1}`" />
                </div>
              </template>
            </Carousel>
            <Carousel :images="projectImages" :currentIndex="currentImageIndex">
              <template v-slot:carousel-item="{ currentIndex }">
                <div class="carousel-item" v-for="(image, index) in projectImages" :key="index" :style="{ transform: `translateX(${-currentIndex * 100}%)` }">
                  <img :src="image" :alt="`Image ${index + 1}`" class="carousel-image" />
                </div>
              </template>
            </Carousel>
            <button class="project-card-button">Read more about this project -></button>
        </div>
    </div> 
</template>

<style lang="scss">
.project-card {
  border: 1px solid black; 

  .container {
    background-color: #f5f5f5;
    width: 80%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    .project-card-title {
      border: 1px solid black; 
    }

    .project-card-url {
      border: 1px solid black;
    }
    .project-card-description {
      border: 1px solid black;
    }
    .project-card-image {
      border: 1px solid black; 
      img {
        width: 100%;
      }
    }
    .project-card-button {
      border: 1px solid black; 
    }
  }
}
</style>