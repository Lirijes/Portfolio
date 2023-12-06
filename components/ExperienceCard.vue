<script setup lang="ts">
import { fetchExperience } from "~/server/api";
import type { Experience } from "~/server/api";

const props = defineProps({
  id: {
    type: Number as PropType<number>,
    required: true,
  },
});
const experience = ref<Experience | null>(null);

onMounted(async () => {
  try {
    if (props.id) {
      experience.value = await fetchExperience(props.id.toString());
    } else {
      console.error("No experience ID provided.");
    }
  } catch (error) {
    console.error("Error fetching experience:", error);
  }
});
</script>

<template>
  <div v-if="experience" class="experience-card">
    <div class="experience-card-container">
      <h5 class="experience-card-title">
        {{ experience.title.toLowerCase() }}
      </h5>
      <p class="experience-card-workplace">at {{ experience.workplace }}</p>
      <div class="experience-card-dates">
        <p class="experience-card-startdate">{{ experience.startDate }} -</p>
        <p class="experience-card-enddate">{{ experience.endDate }}</p>
      </div>
      <p class="experience-card-description">{{ experience.description }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.experience-card {
  margin: 10px 0;
  padding: 20px 0;

  .experience-card-container {
    background-color: #f5f5f5;
    width: 100%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .experience-card-title {
      font-size: 16px;
      display: flex;
      justify-content: center;
      font-weight: bold;
    }

    .experience-card-workplace {
      font-size: 14px;
      display: flex;
      justify-content: center;
      margin-bottom: 5px;
    }

    .experience-card-dates {
      display: flex;
      justify-content: center;
      margin-bottom: 5px;

      .experience-card-startdate {
        font-size: 14px;
        margin-right: 5px;
      }

      .experience-card-enddate {
        font-size: 14px;
      }
    }

    .experience-card-description {
      font-size: 14px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
