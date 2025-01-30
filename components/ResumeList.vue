<script setup lang="ts">

const props = defineProps({
  fetchData: {
    type: Function as PropType<() => Promise<any[]>>,
    required: true,
  },
  sectionTitle: {
    type: String,
    required: true,
  },
  itemKey: {
    type: String,
    required: true,
  },
  fields: {
    type: Array as PropType<string[]>, 
    required: true,
  },
  reverse: {
    type: Boolean,
    default: false, // prop to control reversing the list
  },
});

const items = ref<any[]>([]);

onMounted(async () => {
  try {
    const fetchedData = await props.fetchData();
    items.value = props.reverse ? fetchedData.reverse() : fetchedData;
  } catch (error) {
    console.error(`Error fetching ${props.sectionTitle.toLowerCase()} data:`, error);
  }
});
</script>

<template>
    <div class="resume-list-container">
        <h1 class="resume-list-title">{{ props.sectionTitle }}</h1>
        <div class="resume-list" v-if="items.length > 0">
        <div v-for="item in items" :key="item.id" class="resume-card">
            <div class="resume-card-container">
            <h5 class="resume-card-title">{{ item[props.itemKey].toLowerCase() }}</h5>
            <p class="resume-card-description" v-for="field in props.fields" :key="field">
                {{ item[field] }}
            </p>
            </div>
        </div>
        </div>
        <div v-else>
        <p>No {{ props.sectionTitle.toLowerCase() }} data available.</p>
        </div>
    </div>
</template>
  
<style lang="scss" scoped>
  .resume-list-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
  
    .resume-list-title {
      font-size: 20px;
      text-align: center;
      margin-bottom: 20px;
    }
  
    .resume-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  
      .resume-card {
        width: 100%;
        border-radius: 10px;
        padding: 15px;
        text-align: center;
        transition: transform 0.2s ease-in-out;
  
        &:hover {
          transform: scale(1.05);
        }
  
        .resume-card-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 10px;
  
          .resume-card-title {
            font-size: 14px;
            font-weight: bold;
          }
  
          .resume-card-description {
            font-size: 11px;
            text-align: center;
            margin-top: 5px;
          }
        }
      }
    }
  }
</style>