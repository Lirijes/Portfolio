<script lang="ts">
import backgroundUrl from '~/public/images/marlon-medau-TFg35jn95OU-unsplashSECOND.jpg'

export default {
  data() {
    return { backgroundUrl }
  }
}
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
              <h5 class="info-header">student web developer.</h5>
              <p class="info-aboutme">A passionate web developer. My life is an exciting balancing act between coding and parenthood. My joy lies in creating digital experiences and finding creative solutions to technical challenges. I believe in balancing technology and love to craft a successful life story!</p>
            </div>
          </div>
          <div class="main-links">
            <div class="main-pages">
              <div class="main-page-links">resume.</div>
              <div class="main-page-links">projects.</div>
              <div class="main-page-links">contact.</div>
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
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        margin: 300px 0px 200px 0px;
      }

      @include xxl {
        margin: 400px 0px 200px 0px;
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

        .self-potrait-img {
          display: none; 

          @include sm {
            display: flex;
            justify-content: center;
          }

          @include mx {
            margin-right: 10px;
          }

          img {
            width: 60%;
            height: 100%;
            border-radius: 50%;

            @include sm {
              height: 50%;
            }
          }
        }

      .main-info {

        @include sm {
          width: 100%;
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

        .main-pages {
          display: flex;
          flex-direction: column;
          align-items: center;

          @include sm {
            flex-direction: row;
            justify-content: space-evenly;
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