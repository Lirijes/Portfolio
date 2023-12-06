<script setup lang="ts">
import { fetchUtility } from "~/server/api";
import type { Utility } from "~/server/api";

const props = defineProps({
  id: {
    type: Number as PropType<number>,
    required: true,
  },
});
const utility = ref<Utility | null>(null);

onMounted(async () => {
  try {
    if (props.id) {
      utility.value = await fetchUtility(props.id.toString());
    } else {
      console.error("No utility ID provided.");
    }
  } catch (error) {
    console.error("Error fetching utility:", error);
  }
});
</script>

<template>
  <div v-if="utility" class="utility-card">
    <div class="utility-card-container">
      <h5 class="utility-card-title">{{ utility.name.toLowerCase() }}</h5>
      <p class="utility-card-description">{{ utility.description }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.utility-card {
  margin: 10px 0;
  padding: 20px 0;

  .utility-card-container {
    background-color: #f5f5f5;
    width: 100%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 40px;

    .utility-card-title {
      font-size: 16px;
      display: flex;
      justify-content: center;
      font-weight: bold;
    }

    .utility-card-description {
      font-size: 14px;
      display: flex;
      justify-content: center;
      text-align: center;
    }
  }
}
</style>
