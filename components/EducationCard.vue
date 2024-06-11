<script setup lang="ts">
import { fetchEducation } from "~/composables/useResumeFetch";
import type { Education } from "~/composables/useResumeFetch";

const props = defineProps({
  id: {
    type: Number as PropType<number>,
    required: true,
  },
});
const education = ref<Education | null>(null);

onMounted(async () => {
  try {
    if (props.id) {
      education.value = await fetchEducation(props.id.toString());
    } else {
      console.error("No education ID provided.");
    }
  } catch (error) {
    console.error("Error fetching education:", error);
  }
});
</script>

<template>
  <div v-if="education" class="education-card">
    <div class="education-card-container">
      <h5 class="education-card-title">
        {{ education.educationTitle.toLowerCase() }}
      </h5>
      <p class="education-card-school">at {{ education.schoolName }}</p>
      <p class="education-card-description">{{ education.description }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.education-card {
  margin: 10px 0;
  padding: 20px 0;

  .education-card-container {
    background-color: #f5f5f5;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .education-card-title {
      font-size: 16px;
      display: flex;
      justify-content: center;
      font-weight: bold;
      text-align: center;
    }

    .education-card-school {
      font-size: 14px;
      display: flex;
      justify-content: center;
      margin-bottom: 5px;
    }

    .education-card-description {
      font-size: 14px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
