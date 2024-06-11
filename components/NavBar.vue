<script setup lang="ts">
import type { Profile } from "~/composables/useProfileFetch";
import { fetchProfile } from "~/composables/useProfileFetch";

const router = useRouter();
const isMenuOpen = ref(false);
const isMobile = ref(false);
const profile = ref<Profile | null>(null);

const fetchData = async () => {
  try {
    profile.value = await fetchProfile("1");
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

const closeMenuAndNavigate = (path: string) => {
  closeMenu();
  router.push(path);
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

// const leave = () => {
//   removeAuthTokenFromLocalStorage();

//   // Optionally, you might want to clear other state variables or perform additional cleanup
//   router.push('/onboarding');
// };

// const removeAuthTokenFromLocalStorage = () => {
//   if (typeof window !== "undefined") {
//     localStorage.removeItem("authToken");
//   }
// };

onBeforeUnmount(() => {
  // Remove the listener when the component is destroyed
  window.removeEventListener("resize", checkMobile);
});

onMounted(() => {
  // Check the initial screen size
  checkMobile();

  // Add a listener for screen size changes
  window.addEventListener("resize", checkMobile);

  fetchData(); // Fetch data when the component is mounted
});
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <NuxtLink to="/" class="navbar-name"
        >{{ profile ? profile.firstName.toLowerCase() : "" }}
        <span class="navbar-lastname">{{
          profile ? profile.lastName.toLowerCase() + "." : ""
        }}</span>
        <span class="navbar-proffession">{{
          profile ? "/ " + profile.title.toLowerCase() : "/ "
        }}</span>
      </NuxtLink>

      <!-- Hamburger menu button (only for mobile) -->
      <div v-if="isMobile" class="hamburger-menu" @click="toggleMenu">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>

      <!-- Navigation menu (hidden initially) -->
      <div class="nav-menu" :class="{ 'show-menu': isMenuOpen && isMobile }">
        <div class="menu-item" @click="closeMenuAndNavigate('/resume')">
          <NuxtLink to="/resume">resume.</NuxtLink>
        </div>
        <div class="menu-item" @click="closeMenuAndNavigate('/projects')">
          <NuxtLink to="/projects">projects.</NuxtLink>
        </div>
        <div class="menu-item" @click="closeMenuAndNavigate('/contact')">
          <NuxtLink to="/contact">contact.</NuxtLink>
        </div>
      </div>

      <!-- Regular links (hidden when hamburger menu is open or not on mobile) -->
      <div class="navbar-links" v-if="!isMenuOpen || !isMobile">
        <NuxtLink to="/resume" class="navbar-link">resume.</NuxtLink>
        <NuxtLink to="/projects" class="navbar-link">projects.</NuxtLink>
        <NuxtLink to="/contact" class="navbar-link">contact.</NuxtLink>
        <!-- <div class="logout-btn" @click="leave">leave-></div> -->
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
@import "../assets/scss/mixins.scss";

.navbar {
  border-radius: 10px;
  background-color: #f5f5f5;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  .container {
    display: grid;
    grid-template-columns: 260px 60px;
    align-items: center;
    padding: 10px;
    position: relative;

    @include mx {
      grid-template-columns: repeat(2, 1fr);
    }

    .navbar-name {
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: bold;

      .navbar-lastname {
        color: rgb(180, 154, 154);
        margin-left: 3px;
      }

      .navbar-proffession {
        font-size: 14px;
        font-weight: 300;
        font-style: italic;
        margin-left: 15px;
      }
    }

    .hamburger-menu {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: end;
      margin-right: 20px;

      .bar {
        width: 25px;
        height: 2px;
        background-color: rgb(180, 154, 154);
        margin: 3px 0;
      }
    }

    .nav-menu {
      display: none;
      position: absolute;
      right: 13px;
      top: 60px;
      width: 30%;
      background-color: rgba(180, 154, 154, 0.5);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      animation: slideTop 0.4s ease-in-out;

      &.show-menu {
        display: block;
      }

      .menu-item {
        font-size: 16px;
        text-align: end;
        margin: 20px 20px 20px 0;
        cursor: pointer;
        transition: opacity 0.4s ease;

        &:hover {
          opacity: 1;
        }
      }

      .logout-btn {
        font-size: 16px;
        text-align: end;
        margin: 20px 20px 20px 0;
        cursor: pointer;
        transition: opacity 0.4s ease;

        &:hover {
          opacity: 1;
        }
      }

      @keyframes slideTop {
        from {
          opacity: 0;
          transform: translateY(-30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }

    .navbar-links {
      display: none;

      @include mx {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }

      .navbar-link {
        transition: all 0.2s ease-in-out;

        &:hover {
          transform: scale(1.1);
          color: rgb(180, 154, 154);
        }
      }
    }
  }
}
</style>
