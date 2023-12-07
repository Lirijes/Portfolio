<script setup lang="ts">
import { submitPhoneNumber, fetchProtectedData  } from "~/server/api.ts";

const phoneNumber = ref("");
const verificationCode = ref("");
const enteredVerificationCode = ref("");
const authToken = ref("");  // Token to be stored and used for authentication
const protectedData = ref(""); // Store the fetched protected data

const handleSubmitPhoneNumber = async () => {
  try {
    const response = await submitPhoneNumber(phoneNumber.value);

    if (response.success) {
      console.log(`Phone number saved successfully. Verification code: ${response.verificationCode}`);
      verificationCode.value = response.verificationCode;  // Set the verification code
      authToken.value = response.authToken;

      // Fetch protected data after successful verification
      await fetchAndSetProtectedData();
    } else {
      console.error('Failed to save phone number. Server returned:', response);
    }
  } catch (error) {
    console.error('Error submitting phone number:', error);
  }
};

const fetchAndSetProtectedData = async () => {
  try {
    const response = await fetchProtectedData(authToken.value);
    protectedData.value = response.data;
    console.log("Fetched protected data:", protectedData.value);
  } catch (error) {
    console.error("Error fetching protected data:", error);
  }
};

const verifyCode = () => {
  if (enteredVerificationCode.value === verificationCode.value) {
    console.log('Verification successful!');
    fetchAndSetProtectedData();
  } else {
    console.error('Verification failed. Please check the entered code.');
  }
};
</script>

<template>
  <div class="onboarding-page">
    <h1>Welcome to the Onboarding Process</h1>
    <label for="phoneNumber">Phone Number:</label>
    <input
      v-model="phoneNumber"
      type="text"
      id="phoneNumber"
      placeholder="Enter your phone number"
    />
    <button @click="handleSubmitPhoneNumber">Submit</button>

     <!-- Display verification code field if the phone number is successfully saved -->
     <div v-if="verificationCode">
      <label for="verificationCode">Verification Code:</label>
      <input
        v-model="enteredVerificationCode"
        type="text"
        id="verificationCode"
        placeholder="Enter the verification code"
      />
      <button @click="verifyCode">Verify Code</button>
    </div>
  </div>
</template>

<style lang="scss">
.onboarding-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  h1 {
    margin-bottom: 2rem;
  }

  input {
    margin-bottom: 1rem;
  }
}
</style>
