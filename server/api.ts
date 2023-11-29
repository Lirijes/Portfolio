// FUNCTION FOR FETCHING PROJECTS FROM API
export interface Project {
    id: number;
    projectTitle: string;
    description: string;
    status: string;
}

export async function fetchProjects(): Promise<Project[]> {
    try {
      const response = await fetch('https://localhost:44307/api/Profile/Projects');
      const json = await response.json();
      return json as Project[];
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
}

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
  try {
    const response = await fetch('https://localhost:44307/api/Profile/ProfileData');
    const json = await response.json();
    return json as Profile;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
}