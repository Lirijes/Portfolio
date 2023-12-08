export default function ({ app, redirect }) {
  const authToken = app.$cookies.get("authToken"); // Get the authentication token from cookies

  if (!authToken) {
    // Redirect to the onboarding page if the token is missing
    return redirect("/onboarding");
  }

  // Continue to the requested page
}
