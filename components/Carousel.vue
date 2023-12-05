<script lang="ts">
export default {
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    currentIndex: Number,
  },
  
  setup(props) {
    const localCurrentIndex = ref(props.currentIndex || 0);

    const prev = () => {
      localCurrentIndex.value = (localCurrentIndex.value - 1 + props.images.length) % props.images.length;
    };

    const next = () => {
      localCurrentIndex.value = (localCurrentIndex.value + 1) % props.images.length;
    };

    return {
      localCurrentIndex,
      prev,
      next,
    };
  },
};
</script>

<template>
    <div class="carousel">
        <button @click="prev" class="carousel-button"><font-awesome-icon icon="fa-solid fa-chevron-left" /></button>
        <div class="carousel-inner">
            <slot name="carousel-item" :currentIndex="localCurrentIndex"></slot>
        </div>
        <button @click="next" class="carousel-button"><font-awesome-icon icon="fa-solid fa-chevron-right" /></button>
    </div>
</template>
  

<style lang="scss">
.carousel {
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: row;

  .carousel-inner {
    display: flex;
    overflow: hidden;
    height: 100%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .carousel-button {
    top: 50%;
    cursor: pointer;
    border: none;
    background-color: #f5f5f5;
    justify-content: space-between;

    &:hover {
        background-color: rgba(0, 0, 0, 0.09);
        
    }
  }
  // .carousel-item {
  //   width: 100%; // Adjust the width based on your layout
  // }

  // .carousel-image {
  //   width: 100%; // Adjust the width based on your layout
  //   height: auto; // Maintain aspect ratio
  //   display: block; // Remove any residual spacing
  // }
}
</style>
