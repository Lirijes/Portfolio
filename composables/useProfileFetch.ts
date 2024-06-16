// FUNCTION FOR FETCHING PROFILE FROM API
export interface Profile {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    aboutMe: string;
  }
  
export async function fetchProfile(profileId: string): Promise<Profile> {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl;
  try {
    const response = await fetch(`${baseUrl}api/Profile/ProfileData`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "API_KEY": config.public.apiKey,
        }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    return json as Profile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}

// FUNCTION FOR FETCHING PROFILE LINKS FROM API
export interface ProfileLink {
  id: number;
  title: string;
  url: string;
}

export async function fetchProfileLinks(): Promise<ProfileLink[]> {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl;
  try {
    const response = await fetch(`${baseUrl}api/Profile/ProfileLinks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "API_KEY": config.public.apiKey,
      }
    });
    const json = await response.json();
    return json as ProfileLink[];
  } catch (error) {
    console.error("Error fetching profile links:", error);
    throw error;
  }
}