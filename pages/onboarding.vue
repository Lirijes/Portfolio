<script setup lang="ts">
import { submitPhoneNumber, fetchProtectedData } from "~/server/api.ts";

const phoneNumber = ref("");
const verificationCode = ref("");
const enteredVerificationCode = ref("");
//const authToken = ref(""); // Token to be stored and used for authentication
//const authToken = ref(localStorage.getItem("authToken") || "");
const protectedData = ref(""); // Store the fetched protected data
const router = useRouter();

const getAuthTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken") || "";
  }
  return "";
};

const authToken = ref(getAuthTokenFromLocalStorage() || "");

const setAuthTokenInLocalStorage = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", token);
  }
};

const handleSubmitPhoneNumber = async () => {
  try {
    const response = await submitPhoneNumber(phoneNumber.value);

    if (response.success) {
      console.log(
        `Phone number is valid. Verification code: ${response.verificationCode}`
      );
      verificationCode.value = response.verificationCode; // Set the verification code
      authToken.value = response.authToken;

      // Save the authToken in localStorage
      setAuthTokenInLocalStorage(response.authToken);

      // Fetch protected data after successful verification
      await fetchAndSetProtectedData();
    } else {
      console.error("Failed to save phone number. Server returned:", response);
    }
  } catch (error) {
    console.error("Error submitting phone number:", error);
  }
};

const fetchAndSetProtectedData = async () => {
  try {
    const response = await fetchProtectedData(authToken.value);
    protectedData.value = response.data;
  } catch (error) {
    console.error("Error fetching protected data:", error);
  }
};

const verifyCode = () => {
  if (enteredVerificationCode.value === verificationCode.value) {
    console.log("Verification successful!");
    fetchAndSetProtectedData();
    router.push('/');
  } else {
    console.error("Verification failed. Please check the entered code.");
  }
};
</script>

<template>
  <div class="onboarding-page">
    <h1 class="onboarding-title">welcome.</h1>
    <label class="label-verification" for="phoneNumber">please enter your phone number to enter the page.</label>
    <input
      class="input-verification"
      v-model="phoneNumber"
      type="text"
      id="phoneNumber"
      placeholder=""
    />
    <button class="verification-btn" @click="handleSubmitPhoneNumber">
      submit.
    </button>

    <!-- Display verification code field if the phone number is successfully saved -->
    <div class="verification-code-section" v-if="verificationCode">
      <label class="label-verification" for="verificationCode"
        >please enter your verification code.</label
      >
      <input
        class="input-verification"
        v-model="enteredVerificationCode"
        type="text"
        id="verificationCode"
        placeholder=""
      />
      <button class="verification-btn" @click="verifyCode">verify.</button>
    </div>
  </div>
</template>

<style lang="scss">
.onboarding-page {
  background-color: rgb(180, 154, 154, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .onboarding-title {
    margin-bottom: 20px;
  }

  .label-verification {
    margin-bottom: 10px;
  }

  .input-verification {
    margin-bottom: 20px;
    border-radius: 10px;
    background-color: #f5f5f5;
    padding: 10px 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border: none;
  }

  .verification-btn {
    margin-top: 5px;
    border-radius: 10px;
    background-color: #f5f5f5;
    padding: 10px 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border: none;

    &:hover {
      transform: scale(1.1);
    }
  }

  .verification-code-section {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
