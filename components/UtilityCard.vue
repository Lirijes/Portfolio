<script setup lang="ts">
import { fetchUtility } from "~/composables/useResumeFetch";
import type { Utility } from "~/composables/useResumeFetch";

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
@import "../assets/scss/mixins.scss";

.utility-card {
  margin: 5px;

  .utility-card-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 40px;

    @include sm {
      padding: 0 40px;
      gap: 10px;
      flex-direction: row;
    }

    .utility-card-title {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 0;

      @include sm {
        margin-bottom: 5px;
      }
    }

    .utility-card-description {
      font-size: 11px;
    }
  }
}
</style>
