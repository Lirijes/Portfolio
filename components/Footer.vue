<script setup lang="ts">
import type { Profile, ProfileLink } from "~/composables/useProfileFetch";
import { fetchProfile, fetchProfileLinks } from "~/composables/useProfileFetch";

// Fetch profile data
const profile = ref<Profile | null>(null);
const profileLinks = ref<ProfileLink[] | null>(null);

const fetchProfileData = async () => {
  try {
    profile.value = await fetchProfile("1");
    profileLinks.value = await fetchProfileLinks();
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

onMounted(() => {
  fetchProfileData();
});

const getIconForLink = (title: string): [string, string] => {
  // Map link titles to corresponding Font Awesome icons
  const iconMap: Record<string, [string, string]> = {
    Facebook: ["fab", "facebook-f"],
    GitHub: ["fab", "github"],
    LinkedIn: ["fab", "linkedin-in"],
    Instagram: ["fab", "instagram"],
  };

  return iconMap[title] || ["far", "question-circle"]; // Default icon if not found
};
</script>

<template>
  <div class="footer">
    <div class="container">
      <div class="footer-body">
        <div class="footer-title">phone.</div>
        <a
          :href="'tel:' + (profile ? profile.phoneNumber : '')"
          class="footer-info"
        >
          {{ profile ? profile.phoneNumber : "" }}
        </a>
      </div>
      <div class="footer-body">
        <div class="footer-title">email.</div>
        <a
          class="footer-info"
          :href="'mailto:' + (profile ? profile.email.toLowerCase() : '')"
        >
          {{ profile ? profile.email.toLowerCase() : "" }}
        </a>
      </div>
      <div class="footer-body">
        <div class="footer-title">follow me.</div>
        <ul class="footer-info">
          <li v-for="link in profileLinks" :key="`profile-link-${link.id}`">
            <a :href="link.url" target="_blank">
              <font-awesome-icon :icon="getIconForLink(link.title)" />
            </a>
          </li>
        </ul>
      </div>
      <div
        class="footer-body"
        style="grid-row: 2; grid-column: 2; justify-content: center"
      >
        <p class="footer-info">© 2025 by Lirije Shabani.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/scss/mixins.scss";

.footer {
  border-radius: 10px;
  background-color: #f5f5f5;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;

    @include sm {
      position: relative;
      bottom: 0;
      left: 0;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 1fr 30px;
      align-items: center;
      padding: 10px;
    }

    @include lg {
      position: relative;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 10px;

      .footer-body {
        &:last-child {
          align-self: center;
        }
      }
    }

    .footer-body {
      display: flex;
      flex-direction: column;
      align-items: center;

      &:last-child {
        align-self: flex-end;

        @include lg {
          align-self: center;
        }
      }

      .footer-title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .footer-info {
        display: flex;
        flex-direction: row;
        font-size: 12px;
        font-weight: 300;

        li {
          margin-right: 18px;

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>
