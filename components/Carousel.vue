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
      <div class="carousel-inner">
        <slot name="carousel-item" :currentIndex="localCurrentIndex"></slot>
      </div>
      <button @click="prev" class="carousel-button">Previous</button>
      <button @click="next" class="carousel-button">Next</button>
    </div>
</template>
  

<style lang="scss">
.carousel {
  position: relative;

  .carousel-inner {
    display: flex;
    overflow: hidden;
  }

  .carousel-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;

    &:first-child {
      left: 0;
    }

    &:last-child {
      right: 0;
    }
  }

  .carousel-item {
    width: 100%; // Adjust the width based on your layout
  }

  .carousel-image {
    width: 100%; // Adjust the width based on your layout
    height: auto; // Maintain aspect ratio
    display: block; // Remove any residual spacing
  }
}
</style>
