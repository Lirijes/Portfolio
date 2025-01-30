<script setup lang="ts">
import type { Profile } from "~/composables/useProfileFetch";
import { fetchProfile } from "~/composables/useProfileFetch";

const profile = ref<Profile | null>(null);

const fetchData = async () => {
  try {
    profile.value = await fetchProfile("1");
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="main">
    <div
      class="backgroundImage"
      :style="{ backgroundImage: `url('/images/marlon-medau-TFg35jn95OU-unsplashSECOND.jpg')` }"
    ></div>
    <div class="container">
      <div class="main-content">
        <div class="main-top">
          <div class="self-potrait-img">
            <img
              src="/images/profile-picc.png"
              alt="selfie!"
            />
          </div>
          <div class="main-info">
            <h1 class="info-title">
              <span class="span-title">dream.</span> 
              build. deliver.
            </h1>
            <h5 class="info-header">
              {{ profile ? profile.title.toLowerCase() : "full-stack developer" }}
            </h5>
            <p class="info-aboutme">{{ profile ? profile.aboutMe : "As a Full-Stack Developer, I love building smooth digital experiences and tackling technical challenges. Problem-solving is both creative and exciting to me, and my goal is to use technology to create meaningful and impactful solutions." }}</p>
          </div>
        </div>
        <div class="main-links">
          <div class="main-pages">
            <NuxtLink to="/about" class="main-page-links">about.</NuxtLink>
            <NuxtLink to="/projects" class="main-page-links"
              >projects.</NuxtLink
            >
            <NuxtLink to="/contact" class="main-page-links">contact.</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/scss/mixins.scss";

.main {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 80px;
  padding-top: 100px;
  
  .backgroundImage {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    opacity: 0.8;
    z-index: -1;
  }

  .container {
    position: relative;
    width: 100%;
    max-width: 1200px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .main-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 40px 20px;

      .main-top {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 60px;

        @media (min-width: 992px) {
          flex-direction: row;
          text-align: left;
        }

        .self-potrait-img {
          display: flex;
          justify-content: center;

          img {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            object-fit: cover;
            object-position: center;
            transition: transform 0.3s ease-in-out;

            &:hover {
              transform: scale(1.05);
            }

            @media (min-width: 992px) {
              width: 250px;
              height: 250px;
            }

            @media (min-width: 1200px) {
              width: 300px;
              height: 300px;
            }
          }
        }

        .main-info {
          max-width: 600px;

          .info-title {
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 15px;

            .span-title {
              color: rgb(180, 154, 154);
              text-shadow: 4px 2px 8px rgba(0, 0, 0, 0.5);
            }

            @media (min-width: 1400px) {
              font-size: 2.5rem;
            }
          }

          .info-header {
            font-size: 1.2rem;
            margin-bottom: 10px;
          }

          .info-aboutme {
            font-size: 1rem;
            line-height: 1.6;
          }
        }
      }

      .main-links {
        margin-top: 20px;

        .main-pages {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          justify-content: center;

          .main-page-links {
            padding: 10px 20px;
            border: 1px solid rgb(180, 154, 154);
            border-radius: 20px;
            transition: all 0.15s ease-in-out;
            text-decoration: none;

            &:hover {
              background-color: rgb(252, 215, 215);
              cursor: pointer;
              transform: scale(1.05);
            }
          }
        }
      }
    }
  }
}

</style>
