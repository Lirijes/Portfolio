<script lang="ts">
import backgroundUrl from '~/public/images/marlon-medau-TFg35jn95OU-unsplashSECOND.jpg';
import type { Profile } from '~/server/api.ts';
import { fetchProfile } from '~/server/api.ts';

export default {
  setup() {
    const profile = ref<Profile | null>(null);

    const fetchData = async () => {
      try {
        profile.value = await fetchProfile('1');
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    onMounted(() => {
      fetchData(); // Fetch data when the component is mounted
    });

    return { 
      backgroundUrl,
      profile,
      fetchData,
    };
  },
};
</script>

<template>
    <div class="main">
      <div class="backgroundImage" :style="{ backgroundImage: `url(${backgroundUrl})` }"></div>
      <div class="container">
        <div class="main-content">
          <div class="main-top">
            <div class="self-potrait-img">
              <img src="../public/images/aiony-haust-3TLl_97HNJo-unsplash.jpg" alt=""/>
            </div>
            <div class="main-info">
              <h1 class="info-title">hello.</h1>
              <h5 class="info-header">{{ profile ? profile.title.toLowerCase() : 'web developer'}}</h5>
              <p class="info-aboutme">{{ profile ? profile.aboutMe : '' }}</p>
            </div>
          </div>
          <div class="main-links">
            <div class="main-pages">
              <NuxtLink to="/resume" class="main-page-links">resume.</NuxtLink>
              <NuxtLink to="/projects" class="main-page-links">projects.</NuxtLink>
              <NuxtLink to="/contact" class="main-page-links">contact.</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>


<style lang="scss">
@import '../assets/scss/mixins.scss';

.main {
  position: relative;
  min-height: 100vh;

  .backgroundImage {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    opacity: 0.8;
  }

  .container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

    .main-content {
      margin: 200px 0px 200px 0px;

      @include sm {
        display: flex;
        flex-direction: column;
      }

      @include lg {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 300px 0px 200px 0px;
        width: 100%;
      }

      .main-top {
        display: flex;
        align-items: center;

        @include sm {
          display: grid;
          grid-template-columns: 250px 320px;
        }

        @include mx {
          grid-template-columns: 250px 400px;
        }

        @include lg {
          grid-template-columns: 270px 500px;
          justify-content: space-between;
          width: 100%;
        }

        @include xl {
          grid-template-columns: 260px 640px;
          justify-content: space-between;
        }

        @include xxl {
          grid-template-columns: 300px 700px;
          justify-content: space-between;
        }

        .self-potrait-img {
          display: none; 

          @include sm {
            display: flex;
            justify-content: center;
          }

          @include mx {
            margin-right: 10px;
          }

          @include lg {
            width: 180%;
            justify-content: center;
          }

          @include xl {
            width: 180%;
            justify-content: end;
          }

          img {
            width: 60%;
            height: 100%;
            border-radius: 50%;

            @include sm {
              height: 50%;
            }

            @include xl {
              margin-right: 50px;
            }
          }
        }

      .main-info {

        @include sm {
          width: 100%;
        }

        @include lg {
          width: 80%;
        }

        @include xl {
          width: 90%;
        }

          .info-title {
            font-size: 70px;
            font-weight: bold;
            margin-bottom: 15px;
          }

          .info-header {
            display: none; 

            @include sm {
              display: block;
              font-size: 22px;
            }
          }

          .info-aboutme {
            display: none;

            @include sm {
              display: block;
              font-size: 16px;
              margin: 15px 0 15px 0;
            }
          }
        }
      }

      .main-links {
        position: relative;
        top: 20px;

        @include lg {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          width: 100%;
        }

        .main-pages {
          display: flex;
          flex-direction: column;
          align-items: center;

          @include sm {
            flex-direction: row;
            justify-content: space-evenly;
          }

          @include lg {
            justify-content: space-evenly;
            grid-column-start: 2;
            grid-column-end: 4;
            margin-left: 20px;
          }

          @include xxl {
            justify-content: space-evenly;
            grid-column-start: 2;
            grid-column-end: 4;
            margin-left: 80px;
          }

        .main-page-links {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 130px;
          height: 40px;
          border: 0.5px solid rgb(180, 154, 154);
          border-radius: 20px;
          transition: all 0.15s ease-in-out;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          margin-bottom: 30px;

          @include sm {
            margin-bottom: 0px;
          }

            &:hover {
              background-color: rgb(252, 215, 215);
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}

</style>