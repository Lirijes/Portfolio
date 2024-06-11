<script setup lang="ts">
import { fetchSkill } from "~/composables/useResumeFetch";
import type { Skill } from "~/composables/useResumeFetch";

const props = defineProps({
  id: {
    type: Number as PropType<number>,
    required: true,
  },
});
const skill = ref<Skill | null>(null);

onMounted(async () => {
  try {
    if (props.id) {
      skill.value = await fetchSkill(props.id.toString());
    } else {
      console.error("No skill ID provided.");
    }
  } catch (error) {
    console.error("Error fetching skill:", error);
  }
});
</script>

<template>
  <div v-if="skill" class="skill-card">
    <div class="skill-card-container">
      <h5 class="skill-card-title">{{ skill.name.toLowerCase() }}</h5>
      <p class="skill-card-description">{{ skill.description }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.skill-card {
  margin: 10px 0;
  padding: 20px 0;

  .skill-card-container {
    background-color: #f5f5f5;
    width: 100%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 40px;

    .skill-card-title {
      font-size: 16px;
      display: flex;
      justify-content: center;
      font-weight: bold;
    }

    .skill-card-description {
      font-size: 14px;
      display: flex;
      justify-content: center;
      text-align: center;
    }
  }
}
</style>
