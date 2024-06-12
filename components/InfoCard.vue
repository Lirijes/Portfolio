<script setup lang="ts">
import { fetchEducation, fetchExperience } from "~/composables/useResumeFetch";
import type { Education, Experience } from "~/composables/useResumeFetch";

const props = defineProps({
  id: {
    type: Number as PropType<number>,
    required: true,
  },
  type: {
    type: String as PropType<'education' | 'experience'>,
    required: true,
  },
});

const data = ref<Education | Experience | null>(null);

onMounted(async () => {
  try {
    if (props.id) {
      if (props.type === 'education') {
        data.value = await fetchEducation(props.id.toString());
      } else if (props.type === 'experience') {
        data.value = await fetchExperience(props.id.toString());
      }
    } else {
      console.error("No ID provided.");
    }
  } catch (error) {
    console.error(`Error fetching ${props.type}:`, error);
  }
});
</script>

<template>
    <div v-if="data" class="info-card">
      <div class="info-card-container">
        <h5 class="info-card-title">
          {{ props.type === 'education' ? (data as Education).educationTitle.toLowerCase() : (data as Experience).title.toLowerCase() }}
        </h5>
        <p class="info-card-place">
          at {{ props.type === 'education' ? (data as Education).schoolName : (data as Experience).workplace }}
        </p>
        <div v-if="props.type === 'experience'" class="info-card-dates">
          <p class="info-card-startdate">{{ (data as Experience).startDate }} -</p>
          <p class="info-card-enddate">{{ (data as Experience).endDate }}</p>
        </div>
        <div v-else-if="props.type === 'education'" class="info-card-dates">
          <p class="info-card-startdate">{{ (data as Education).startDate }} -</p>
          <p class="info-card-enddate">{{ (data as Education).endDate }}</p>
        </div>
        <p class="info-card-description">{{ data.description }}</p>
      </div>
    </div>
  </template>
  
  <style lang="scss">
  .info-card {
    margin: 10px 0;
    padding: 20px 0;
  
    .info-card-container {
      background-color: #f5f5f5;
      width: 100%;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  
      .info-card-title {
        font-size: 16px;
        display: flex;
        justify-content: center;
        font-weight: bold;
      }
  
      .info-card-place {
        font-size: 14px;
        display: flex;
        justify-content: center;
        margin-bottom: 5px;
      }
  
      .info-card-dates {
        display: flex;
        justify-content: center;
        margin-bottom: 5px;
  
        .info-card-startdate {
          font-size: 14px;
          margin-right: 5px;
        }
  
        .info-card-enddate {
          font-size: 14px;
        }
      }
  
      .info-card-description {
        font-size: 14px;
        display: flex;
        justify-content: center;
      }
    }
  }
  </style>
