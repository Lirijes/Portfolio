<script setup lang="ts">
import {
  fetchSkills,
  fetchUtilities,
} from "~/composables/useResumeFetch";
import type { Skill, Utility } from "~/composables/useResumeFetch";

const skills = ref<Skill[]>([]);
const utilities = ref<Utility[]>([]);

onMounted(async () => {
  try {
    skills.value = await fetchSkills();
    utilities.value = await fetchUtilities();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<template>
  <div class="about-page">
    <div class="about-header">
      <h1 class="about-title">about me.</h1>
      <a href="/resume.lirijeshabani.pdf" target="_blank">
        <button class="load-resume">load resume as PDF</button>
      </a>
    </div>
    <div class="container">
      <div class="about-content-container">
        <div class="about-section">
          <h1 class="about-section-title">skills.</h1>
          <div class="about-list" v-if="skills.length > 0">
            <SkillCard v-for="skill in skills" :key="skill.id" :id="skill.id" />
          </div>
        </div>
        <div class="about-section">
          <h1 class="about-section-title">utilities.</h1>
          <div class="about-list" v-if="utilities.length > 0">
            <UtilityCard
              v-for="utility in utilities"
              :key="utility.id"
              :id="utility.id"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/scss/mixins.scss";

.about-page {
  padding: 100px 0;
  background-color: rgb(180, 154, 154, 0.7);
  flex: 1; // added this that helped the page be as larg as the screen

  .about-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    width: 100%;
    grid-gap: 10px;

    @include sm {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      grid-gap: 50px;
    }

    .about-title {
      font-size: 22px;
      text-align: center;

      @include sm {
        grid-column: 2;
        margin-top: 9%;
      }
    }

    .load-resume {
      padding: 7px 15px;
      border-radius: 10px;
      border: none;
      background-color: #f5f5f5;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .container {
    width: 90%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 10px;

    @include mx {
      width: 80%;
    }

    .about-content-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 100%;

      @include lg {
        flex-direction: row;
        justify-content: space-between;
      }

      .about-section {
        background-color: #f5f5f5;
        margin-bottom: 30px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        flex: 1;

        .about-section-title {
          font-size: 20px;
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        .about-list {
          border-radius: 10px;
          width: 100%;
        }
      }
    }
  }
}
</style>