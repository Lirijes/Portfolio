<script setup lang="ts">
import { checkAuthentication, fetchProject } from "~/server/api";
import type { Project } from "~/server/api";

const route = useRoute();
const project = ref<Project | null>(null);

onMounted(async () => {
  checkAuthentication();
  try {
    const id = route.params.id as string;
    if (id) {
      project.value = await fetchProject(id);
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
  <div class="projectdetail">
    <div class="container">
      <h2 class="projectdetail-title">
        {{ project ? project.projectTitle.toLocaleLowerCase() : "Loading..." }}
      </h2>
      <p class="projectdetail-description">
        {{ project ? project.description : "Loading..." }}
      </p>
      <div class="image-array-container">
        <div
          class="image-array"
          v-for="(image, index) in projectImages"
          :key="index"
        >
          <img class="one-img-array" :src="image" :alt="`Image ${index + 1}`" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/scss/mixins.scss";

.projectdetail {
  padding: 100px 0 50px 0;
  background-color: rgb(180, 154, 154, 0.7);
  flex: 1; // added this that helped the page be as larg as the screen

  .container {
    background-color: #f5f5f5;
    width: 90%;
    border-radius: 10px;
    padding: 20px 0 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .projectdetail-title {
      font-size: 20px;
      display: flex;
      justify-content: center;
    }

    .projectdetail-description {
      font-size: 14px;
      display: flex;
      justify-content: center;
    }

    .image-array-container {
      width: 90%;
      justify-content: center;
      align-items: center;
      padding: 20px 0;

      @include sm {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }

      @include xl {
        grid-template-columns: repeat(4, 1fr);
      }

      .image-array {
        width: 100%;
        height: 200px;

        @include xl {
          height: 400px;
        }

        .one-img-array {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding-bottom: 10px;

          @include xl {
            padding-bottom: 0;
            padding-right: 10px;
            object-fit: cover;
          }
        }
      }
    }
  }
}
</style>
