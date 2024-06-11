// FUNCTION FOR SUBMITTING CONTACT FORM TO API
export interface ContactForm {
    name: string;
    email: string;
    phone: string;
    message: string;
  }
  
  export async function submitContactForm(formData: ContactForm): Promise<void> {
    const config = useRuntimeConfig();
    const baseUrl = config.public.apiBaseUrl;
    try {
      const response = await fetch(baseUrl + "/Profile/Contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ApiKey": config.public.apiKey,
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(
          `Failed to submit contact form. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      throw error;
    }
  }