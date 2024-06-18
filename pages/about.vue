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
      <div class="about-intro">
        <p class="about-intro-text">
          Hi. I'm Lirije Shabani, a full stack developer based in Sweden. 
          Always looking for new opportunities to learn and grow as a developer, 
          there is a strong passion for software development and a constant pursuit of new ways to improve skills and learn new technologies. 
          I thrive on diving into new challenges and am always seeking opportunities for personal and professional growth.
          I value the practical experience I've gained through my web development studies and my internship at Revolution Race, 
          strengthening my understanding of real-world programming. 
          Excitement surrounds the idea of applying these practical skills and contributing effectively to future roles and projects.
        </p>
        <a href="/Examensbevis_Webbutvecklare_inom_.NET_LirijeShabani.pdf" target="_blank">
          <button class="about-btn">certificate</button>
        </a>
        <a href="/Rekommendationsbrev_LirijeShabani-Signed.pdf" target="_blank">
          <button class="about-btn">letter of recommendation (swedish)</button>
        </a>
      </div>
      <div class="about-content-container">
        <div class="about-section skills-section">
          <h1 class="about-section-title">skills.</h1>
          <div class="about-list" v-if="skills.length > 0">
            <SkillCard v-for="skill in skills" :key="skill.id" :id="skill.id" />
          </div>
        </div>
        <div class="about-section utilities-section">
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

    .about-intro {
      padding: 20px 40px;
      border-radius: 10px;
      border: none;
      background-color: #f5f5f5;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      margin-bottom: 30px;

      .about-btn {
        background-color: rgb(180, 154, 154, 0.7); 
        border-radius: 5px;
        border: none; 
        padding: 10px 10px;
        font-size: 14px;
        margin: 10px 10px 0px 0px;

        &:hover {
          background-color: rgb(180, 154, 154, 1); 
        }
      }
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

      .skills-section {
        flex: 1;
      }

      .utilities-section {
        flex: 2;

        @include xl {
          flex: 1;
        }
      }
    }
  }
}
</style>