<script setup lang="ts">
import { fetchProfile, fetchProfileLinks, submitContactForm } from '~/composables/useContactForm';
import type { Profile, ProfileLink } from '~/composables/useContactForm';

const profile = ref<Profile | null>(null);
const profileLinks = ref<ProfileLink[] | null>(null);

// Reactive object to store form data
const formData = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
});

// Method to handle form submission
const handleSubmit = async () => {
  try {
    // Call the API function to submit the contact form
    await submitContactForm(formData.value);
    
    // Optionally, you can reset the form fields after successful submission
    formData.value = {
      name: '',
      email: '',
      phone: '',
      message: '',
    };

    console.log('Contact form submitted successfully!');
  } catch (error) {
    console.error('Error submitting contact form:', error);
  }
};

onMounted(async () => {
    try {
        profile.value = await fetchProfile('1');
        profileLinks.value = await fetchProfileLinks();
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
});
</script>

<template>
    <div class="contact-page">
      <h1 class="contact-title">contact me.</h1>
      <p class="contact-par">looking forward hearing from you</p>
      <div class="container">
        
        <div class="contact-data">
          <p class="contact-info">send me an email.</p>
          <a class="footer-info" :href="'mailto:' + (profile ? profile.email.toLowerCase() : '')">
              {{ profile ? profile.email.toLowerCase() : '' }}
          </a>
          <p class="contact-info">call or text me.</p>
          <a :href="'tel:' + (profile ? profile.phoneNumber : '')" class="footer-info">
            {{ profile ? profile.phoneNumber : '' }}
          </a>
        </div>
        
        <form class="contact-form" @submit.prevent="handleSubmit">
          <div class="input-field">
            <input v-model="formData.name" type="text" class="contact-form-text" placeholder="">
            <p class="contact-placeholder">name.</p>
          </div>
          <div class="input-field">
            <input v-model="formData.email" type="email" class="contact-form-text" placeholder="">
            <p class="contact-placeholder">email.</p>
          </div>
          <div class="input-field">
            <input v-model="formData.phone" type="text" class="contact-form-text" placeholder="">
            <p class="contact-placeholder">phonenumber.</p>
          </div>
          <div class="input-field">
            <textarea v-model="formData.message" class="contact-form-text" placeholder=""></textarea>
            <p class="contact-placeholder">message.</p>
          </div>

          <button type="submit" class="contact-form-btn">send</button>
        </form>
      </div>
    </div>
</template>

<style lang="scss">
@import '../assets/scss/mixins.scss';

.contact-page {
  padding: 100px 0;
  background-color: rgb(180, 154, 154, 0.7); 
  flex: 1; // added this that helped the page be as larg as the screen

  .contact-title {
    font-size: 22px;
    display: flex;
    justify-content: center;
  }

  .contact-par {
    font-size: 14px;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  .container {
    background-color: #f5f5f5;
    width: 90%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @include lg {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
    }

    .contact-data {
      width: 90%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px solid rgb(180, 154, 154);
      border-radius: 10px;
      padding: 20px 20px;
      margin-top: 20px;

      
      @include lg {
        width: 100%;
        grid-column-start: 1 ;
        grid-column-end: 3;
      }

      .contact-info {
        font-size: 16px;
        margin-bottom: 5px;
        font-weight: 700;
      }

      .footer-info {
        font-size: 14px;
        margin-bottom: 5px;
        text-decoration: none;
        color: black;
      }
    }

    .contact-form {
      width: 90%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px solid rgb(180, 154, 154);
      border-radius: 10px;
      padding: 20px 20px;
      margin: 20px 0;

      @include lg {
        grid-column-start: 4;
        grid-column-end: 7;
        width: 100%;
      }

      .input-field {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
        background-color: transparent;

        .contact-placeholder {
          font-size: 14px;
          margin-bottom: 5px;
        }

        .contact-form-text {
          width: 100%;
          height: 40px;
          border-radius: 5px;
          border: none; 
          border-bottom: 2px solid rgb(180, 154, 154); 
          padding: 0 10px;
          font-size: 14px;
        }
      }
      .contact-form-btn {
        background-color: rgb(180, 154, 154, 0.7); 
        width: 100%;
        border-radius: 5px;
        border: none; 
        padding: 0 10px;
        font-size: 14px;
        margin-top: 10px;

        &:hover {
          background-color: rgb(180, 154, 154, 1); 
        }
      }
    } 
  }
}
</style>