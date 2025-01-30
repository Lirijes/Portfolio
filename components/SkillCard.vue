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
    <div class="skill-card-info">
      <h5 class="skill-card-title">{{ skill.name.toLowerCase() }}</h5>
      <p class="skill-card-description">{{ skill.description }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.skill-card {
  width: 100%;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.05);
  }

  .skill-card-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;

    .skill-card-title {
      font-size: 14px;
      font-weight: bold;
      text-align: center;
    }

    .skill-card-description {
      font-size: 11px;
      display: flex;
      justify-content: center;
      text-align: center;
      margin-top: 5px;
    }
  }
}
</style>
