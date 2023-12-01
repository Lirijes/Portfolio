// FUNCTION FOR FETCHING PROJECTS FROM API
export interface Project {
    id: number;
    projectTitle: string;
    projectUrl: string;
    description: string;
}

export async function fetchProjects(): Promise<Project[]> {
    try {
      const response = await fetch('http://localhost:5235/api/Profile/Projects');
      const json = await response.json();
      return json as Project[];
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
}

export async function fetchProject(projectId: string): Promise<Project> {
  try {
    const response = await fetch(`http://localhost:5235/api/Profile/Project?id=${projectId}`);
    if (!response.ok) {
      // Handle non-success status codes
      if (response.status === 404) {
        throw new Error('Project not found');
      } else {
        throw new Error(`Failed to fetch project. Status: ${response.status}`);
      }
    }
    const json = await response.json();
    return json as Project;
  } catch (error) {
    console.error('Error fetching project:', error);
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
    const response = await fetch('http://localhost:5235/api/Profile/ProfileData');
    const json = await response.json();
    return json as Profile;
  } catch (error) {
    console.error('Error fetching profile:', error);
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
  try {
    const response = await fetch(`http://localhost:5235/api/Profile/ProfileLinks/`);
    const json = await response.json();
    return json as ProfileLink[];
  } catch (error) {
    console.error('Error fetching profile links:', error);
    throw error;
  }
}

