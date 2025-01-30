<script setup lang="ts">
import {
  fetchSkills, fetchExperiences, fetchEducations
} from "~/composables/useResumeFetch";
import type { Skill, Experience, Education } from "~/composables/useResumeFetch";
import ResumeList from "~/components/ResumeList.vue";

const skills = ref<Skill[]>([]);

onMounted(async () => {
  try {
    skills.value = await fetchSkills();
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
    <!-- Grid Container -->
    <div class="grid-container">
      <!-- About Me Section -->
      <div class="grid-item about-intro">
        <h1 class="about-section-title">hi</h1>
        <p class="about-intro-text">
          Hi. I'm Lirije, a full stack developer based in Sweden. <br /><br />
          I’m always striving for growth, both professionally and personally.
          <br />
          Through my internships at Revolution Race and Houshmand Tech AB, I’ve
          gained valuable hands-on experience and a solid understanding of
          real-world programming. <br />
          I’m excited to keep evolving and make a meaningful impact as a
          developer.
        </p>
        <a href="/Examensbevis_Webbutvecklare_inom_.NET_LirijeShabani.pdf" target="_blank">
          <button class="about-btn">certificate</button>
        </a>
      </div>

      <!-- Experience Section -->
      <div class="grid-item">
        <ResumeList
          :fetchData="fetchExperiences"
          sectionTitle="experience"
          itemKey="title"
          :fields="['workplace', 'startDate', 'endDate', 'description']"
          reverse
        />
      </div>

      <!-- Education Section -->
      <div class="grid-item">
        <ResumeList
          :fetchData="fetchEducations"
          sectionTitle="education"
          itemKey="educationTitle"
          :fields="['schoolName', 'startDate', 'endDate', 'description']"
        />
      </div>

      <!-- Skills Section -->
      <div class="grid-item">
        <h1 class="about-section-title">skills.</h1>
        <div class="about-list" v-if="skills.length > 0">
          <SkillCard v-for="skill in skills" :key="skill.id" :id="skill.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/scss/mixins.scss";

.about-page {
  padding: 100px 20px;
  background-color: rgb(180, 154, 154, 0.7);

  .about-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;

    .about-title {
      font-size: 22px;
      margin-bottom: 10px;
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

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
    gap: 20px;
    padding: 0 20px;

    @media (max-width: 1400px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr; 
    }

    .grid-item {
      background-color: #f5f5f5;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

      &.about-intro {
        text-align: left;

        .about-intro-text {
          font-size: 13px;
          margin: 40px 0px;
        }

        .about-btn {
          background-color: rgb(180, 154, 154, 0.7);
          border-radius: 5px;
          border: none;
          padding: 10px;
          font-size: 14px;

          &:hover {
            background-color: rgb(180, 154, 154, 1);
          }
        }
      }
      .about-section-title {
        font-size: 20px;
        text-align: center;
        margin-bottom: 20px;
      }

      .about-list {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
}

</style>