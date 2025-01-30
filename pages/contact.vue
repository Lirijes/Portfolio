<script setup lang="ts">
import { submitContactForm } from '~/composables/useContactForm';
import { fetchProfile, fetchProfileLinks } from '~/composables/useProfileFetch';
import type { Profile, ProfileLink } from '~/composables/useProfileFetch';

const profile = ref<Profile | null>(null);
const profileLinks = ref<ProfileLink[] | null>(null);
const showSuccessMessage = ref(false);
const showErrorMessage = ref(false);
const isSubmitting = ref(false);

// Reactive object to store form data
const formData = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
});

// Reactive object to store validation errors
const errors = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
});

// Validation functions
const validateName = (name: string) => {
  return name.trim().length >= 2 ? '' : 'Name must be at least 2 characters long.';
};

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Valid email is required.';
};

const validatePhone = (phone: string) => {
  const regex = /^(?:\+?(\d{1,3})[-.\s]?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{3,4})(?:[-.\s]?(\d{1,9}))?)$/;
  const isValid = regex.test(phone);
  return isValid ? '' : 'Invalid phone number';
};

const validateMessage = (message: string) => {
  const length = message.trim().length;
  return length >= 5 && length <= 1000 ? '' : 'Message must be between 5 and 1000 characters long.';
};

// Method to handle form submission
const handleSubmit = async () => {
  errors.value.name = validateName(formData.value.name);
  errors.value.email = validateEmail(formData.value.email);
  errors.value.phone = validatePhone(formData.value.phone);
  errors.value.message = validateMessage(formData.value.message);

  if (errors.value.name || errors.value.email || errors.value.phone || errors.value.message) {
    showErrorMessage.value = true;
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000); 
    return;
  }

  isSubmitting.value = true;
  try {
    await submitContactForm(formData.value);

    formData.value = {
      name: '',
      email: '',
      phone: '',
      message: '',
    };

    showSuccessMessage.value = true;
    setTimeout(() => {
      showSuccessMessage.value = false;
    }, 5000);

    console.log('Contact form submitted successfully!');
  } catch (error) {
    console.error('Error submitting contact form:', error);
    showErrorMessage.value = true;
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000); 
  } finally {
    isSubmitting.value = false; 
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
        <div class="contact-item">
          <p class="contact-info">send me an email.</p>
          <a class="footer-info" :href="'mailto:' + (profile ? profile.email.toLowerCase() : '')">
              {{ profile ? profile.email.toLowerCase() : '' }}
          </a>
        </div>
        <div class="contact-item">
          <p class="contact-info">call or text me.</p>
          <a :href="'tel:' + (profile ? profile.phoneNumber : '')" class="footer-info">
            {{ profile ? profile.phoneNumber : '' }}
          </a>
        </div>
      </div>
      <form class="contact-form" @submit.prevent="handleSubmit">
        <h5>The contact form is temporarily unavailable due to changes made by Microsoft.</h5>
        <div class="input-field">
          <input v-model="formData.name" @keyup="errors.name = validateName(formData.name)" type="text" class="contact-form-text" placeholder="">
          <p class="contact-placeholder">name.</p>
          <p v-if="errors.name" class="error-text">{{ errors.name }}</p>
        </div>
        <div class="input-field">
          <input v-model="formData.email" @keyup="errors.email = validateEmail(formData.email)" type="email" class="contact-form-text" placeholder="">
          <p class="contact-placeholder">email.</p>
          <p v-if="errors.email" class="error-text">{{ errors.email }}</p>
        </div>
        <div class="input-field">
          <input v-model="formData.phone" @keyup="errors.phone = validatePhone(formData.phone)" type="text" class="contact-form-text" placeholder="">
          <p class="contact-placeholder">phonenumber.</p>
          <p v-if="errors.phone" class="error-text">{{ errors.phone }}</p>
        </div>
        <div class="input-field">
          <textarea v-model="formData.message" @keyup="errors.message = validateMessage(formData.message)" class="contact-form-text" placeholder=""></textarea>
          <p class="contact-placeholder">message.</p>
          <p v-if="errors.message" class="error-text">{{ errors.message }}</p>
        </div>

        <button type="submit" class="contact-form-btn" :disabled="isSubmitting">
          {{ isSubmitting ? 'sending...' : 'send' }}
        </button>
      </form>
      <div v-if="showSuccessMessage" class="success-message">
        Thank you for your message! I will get back to you soon.
      </div>
      <div v-if="showErrorMessage" class="error-message">
        Please fix the errors below and try again.
      </div>
    </div>
  </div>
</template>


<style lang="scss">
@import '../assets/scss/mixins.scss';

.contact-page {
  padding: 100px 20px;
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
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    padding: 0 20px; 
    display: flex;
    flex-direction: column;
    gap: 20px;

    @include lg {
      max-width: 100%;
      padding: 0 20px;
    }

    .contact-data,
    .contact-form {
      background-color: #f5f5f5;
      border-radius: 10px;
      padding: 20px;
      width: 100%;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .contact-data {
      display: flex;
      flex-direction: column;
      align-items: center;

      @include lg {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 50px;
      }

      .contact-item {
        margin-bottom: 10px;

        .contact-info {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .footer-info {
          font-size: 14px;
          text-decoration: none;
          color: #000;
        }
      }
    }

    .contact-form {
      .input-field {
        margin-bottom: 10px;

        .contact-form-text {
          width: 100%;
          height: 40px;
          border-radius: 5px;
          border: none;
          border-bottom: 2px solid rgba(180, 154, 154, 0.7); 
          padding: 0 10px;
        }

        textarea.contact-form-text {
          height: 80px;
        }

        .error-text {
          font-size: 12px;
          color: rgb(180, 154, 154, 0.7);
        }
      }

      .contact-form-btn {
        width: 100%;
        padding: 10px;
        font-size: 14px;
        border-radius: 5px;
        background-color: rgba(180, 154, 154, 0.7);

        &:hover {
          background-color: rgba(180, 154, 154, 1);
        }
      }
    }
  }
}
</style>