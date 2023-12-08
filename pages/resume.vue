<script setup lang="ts">
import {
  checkAuthentication,
  fetchEducations,
  fetchExperiences,
  fetchSkills,
  fetchUtilities,
} from "~/server/api";
import type { Education, Experience, Skill, Utility } from "~/server/api";

const educations = ref<Education[]>([]);
const experiences = ref<Experience[]>([]);
const skills = ref<Skill[]>([]);
const utilities = ref<Utility[]>([]);

onMounted(async () => {
  checkAuthentication();
  try {
    educations.value = await fetchEducations();
    experiences.value = await fetchExperiences();
    skills.value = await fetchSkills();
    utilities.value = await fetchUtilities();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<template>
  <div class="resume-page">
    <div class="resume-header">
      <h1 class="resume-title">resume.</h1>
      <button class="load-resume">load resume as PDF</button>
    </div>
    <div class="container">
      <div class="resume-section">
        <h1 class="resume-section-title">education.</h1>
        <div class="resume-list" v-if="educations.length > 0">
          <EducationCard
            v-for="education in educations"
            :key="education.id"
            :id="education.id"
          />
        </div>
      </div>
      <div class="resume-section">
        <h1 class="resume-section-title">experience.</h1>
        <div class="resume-list" v-if="experiences.length > 0">
          <ExperienceCard
            v-for="experience in experiences"
            :key="experience.id"
            :id="experience.id"
          />
        </div>
      </div>
      <div class="resume-section">
        <h1 class="resume-section-title">skills.</h1>
        <div class="resume-list" v-if="skills.length > 0">
          <SkillCard v-for="skill in skills" :key="skill.id" :id="skill.id" />
        </div>
      </div>
      <div class="resume-section">
        <h1 class="resume-section-title">utilities.</h1>
        <div class="resume-list" v-if="utilities.length > 0">
          <UtilityCard
            v-for="utility in utilities"
            :key="utility.id"
            :id="utility.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/scss/mixins.scss";

.resume-page {
  padding: 100px 0;
  background-color: rgb(180, 154, 154, 0.7);
  flex: 1; // added this that helped the page be as larg as the screen

  .resume-header {
    display: grid;
    justify-items: center;
    align-items: center;

    @include xl {
      grid-template-columns: repeat(9, 1fr);
    }

    .resume-title {
      font-size: 22px;
    }

    @include xl {
      .resume-title {
        grid-column-start: 5;
        grid-column-end: 6;
      }
    }

    .load-resume {
      margin: 10px 0;
      padding: 7px 15px;
      border-radius: 10px;
      border: none;
      background-color: #f5f5f5;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      @include xl {
        grid-column-start: 7;
        grid-column-end: 9;
        margin-left: -20px;
      }

      @include xxl {
        grid-column-start: 7;
        grid-column-end: 8;
        margin-left: -20px;
      }

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

    .resume-section {
      width: 100%;
      background-color: #f5f5f5;
      margin-bottom: 30px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

      .resume-section-title {
        font-size: 20px;
        display: flex;
        justify-content: center;
        margin-top: 20px;
      }

      .resume-list {
        border-radius: 10px;
        width: 100%; //might need a different approach maybe grid for bigger screens
      }
    }
  }
}
</style>
