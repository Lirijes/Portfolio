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

export async function fetchProject(id: string): Promise<Project> {
  try {
    const response = await fetch(`http://localhost:5235/api/Profile/Project?id=${id}`);
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

// FUNCTION FOR SUBMITTING CONTACT FORM TO API
export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function submitContactForm(formData: ContactForm): Promise<void> { //Sends a post request to the API
  try {
    const response = await fetch('http://localhost:5235/api/Profile/Contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      // Handle non-success status codes
      throw new Error(`Failed to submit contact form. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}