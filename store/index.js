export const state = () => ({
  phoneNumber: null,
  verificationCode: null,
  isAuthenticated: false,
});

export const mutations = {
  setPhoneNumber(state, phoneNumber) {
    state.phoneNumber = phoneNumber;
  },
  setVerificationCode(state, code) {
    state.verificationCode = code;
  },
  setIsAuthenticated(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },
};
