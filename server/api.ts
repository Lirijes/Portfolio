//FUNCTION TO FETCH PROTECTED DATA USING PROVIDED AUTHTOKEN
export interface ProtectedDataResponse {
  data: string; // Replace 'string' with the actual type of your protected data
}

export async function fetchProtectedData(authToken: string): Promise<ProtectedDataResponse> {
  try {
    const response = await fetch("http://localhost:5235/api/Profile/ProtectedData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to fetch protected data. Status: ${response.status}`);
    }

    return data as ProtectedDataResponse;
  } catch (error) {
    console.error("Error fetching protected data:", error);
    throw error;
  }
}

// FUNCTION TO SAVE PHONE NUMBER TO API0
export interface SavePhoneNumberResponse {
  success: boolean;
  verificationCode: string;
  authToken: string;
}

export async function submitPhoneNumber(phoneNumber: string): Promise<SavePhoneNumberResponse> {
  try {
    const response = await fetch("http://localhost:5235/api/Profile/SavePhoneNumber", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to save phone number. Server returned: ${JSON.stringify(data)}`);
    }

    // Store the authentication token locally
    localStorage.setItem("authToken", data.authToken);

    return data as SavePhoneNumberResponse;
  } catch (error) {
    console.error("Error saving phone number:", error);
    throw error;
  }
}


// FUNCTION FOR FETCHING PROJECTS FROM API
export interface Project {
  id: number;
  projectTitle: string;
  projectUrl: string;
  description: string;
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch("http://localhost:5235/api/Profile/Projects");
    const json = await response.json();
    return json as Project[];
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

export async function fetchProject(id: string): Promise<Project> {
  try {
    const response = await fetch(
      `http://localhost:5235/api/Profile/Project?id=${id}`
    );
    if (!response.ok) {
      // Handle non-success status codes
      if (response.status === 404) {
        throw new Error("Project not found");
      } else {
        throw new Error(`Failed to fetch project. Status: ${response.status}`);
      }
    }
    const json = await response.json();
    return json as Project;
  } catch (error) {
    console.error("Error fetching project:", error);
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
    const response = await fetch(
      "http://localhost:5235/api/Profile/ProfileData"
    );
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
  try {
    const response = await fetch(
      `http://localhost:5235/api/Profile/ProfileLinks/`
    );
    const json = await response.json();
    return json as ProfileLink[];
  } catch (error) {
    console.error("Error fetching profile links:", error);
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

export async function submitContactForm(formData: ContactForm): Promise<void> {
  //Sends a post request to the API
  try {
    const response = await fetch("http://localhost:5235/api/Profile/Contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      // Handle non-success status codes
      throw new Error(
        `Failed to submit contact form. Status: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
}

// FUNCTION FOR FETCHING EDUCATION FROM API
export interface Education {
  id: number;
  educationTitle: string;
  schoolName: string;
  description: string;
}

export async function fetchEducations(): Promise<Education[]> {
  try {
    const response = await fetch(
      "http://localhost:5235/api/Profile/ProfileEducations"
    );
    const json = await response.json();
    return json as Education[];
  } catch (error) {
    console.error("Error fetching education:", error);
    throw error;
  }
}

export async function fetchEducation(id: string): Promise<Education> {
  try {
    const response = await fetch(
      `http://localhost:5235/api/Profile/ProfileEducation?id=${id}`
    );
    if (!response.ok) {
      // Handle non-success status codes
      if (response.status === 404) {
        throw new Error("Education not found");
      } else {
        throw new Error(
          `Failed to fetch education. Status: ${response.status}`
        );
      }
    }
    const json = await response.json();
    return json as Education;
  } catch (error) {
    console.error("Error fetching education:", error);
    throw error;
  }
}

// FUNCTION FOR FETCHING EXPERIENCE FROM API
export interface Experience {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  workplace: string;
  description: string;
}

export async function fetchExperiences(): Promise<Experience[]> {
  try {
    const response = await fetch(
      "http://localhost:5235/api/Profile/ProfileExperiences"
    );
    const json = await response.json();
    return json as Experience[];
  } catch (error) {
    console.error("Error fetching experience:", error);
    throw error;
  }
}

export async function fetchExperience(id: string): Promise<Experience> {
  try {
    const response = await fetch(
      `http://localhost:5235/api/Profile/ProfileExperience?id=${id}`
    );
    if (!response.ok) {
      // Handle non-success status codes
      if (response.status === 404) {
        throw new Error("Experience not found");
      } else {
        throw new Error(
          `Failed to fetch experience. Status: ${response.status}`
        );
      }
    }
    const json = await response.json();
    return json as Experience;
  } catch (error) {
    console.error("Error fetching experience:", error);
    throw error;
  }
}

// FUNCTION FOR FETCHING SKILLS FROM API
export interface Skill {
  id: number;
  name: string;
  description: string;
}

export async function fetchSkills(): Promise<Skill[]> {
  try {
    const response = await fetch("http://localhost:5235/api/Profile/Skills");
    const json = await response.json();
    return json as Skill[];
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw error;
  }
}

export async function fetchSkill(id: string): Promise<Skill> {
  try {
    const response = await fetch(
      `http://localhost:5235/api/Profile/Skill?id=${id}`
    );
    if (!response.ok) {
      // Handle non-success status codes
      if (response.status === 404) {
        throw new Error("Skill not found");
      } else {
        throw new Error(`Failed to fetch skill. Status: ${response.status}`);
      }
    }
    const json = await response.json();
    return json as Skill;
  } catch (error) {
    console.error("Error fetching skill:", error);
    throw error;
  }
}

// FUNCTION FOR FETCHING UTILITIES FROM API
export interface Utility {
  id: number;
  name: string;
  description: string;
}

export async function fetchUtilities(): Promise<Utility[]> {
  try {
    const response = await fetch("http://localhost:5235/api/Profile/Utilities");
    const json = await response.json();
    return json as Utility[];
  } catch (error) {
    console.error("Error fetching utilities:", error);
    throw error;
  }
}

export async function fetchUtility(id: string): Promise<Utility> {
  try {
    const response = await fetch(
      `http://localhost:5235/api/Profile/Utility?id=${id}`
    );
    if (!response.ok) {
      // Handle non-success status codes
      if (response.status === 404) {
        throw new Error("Utility not found");
      } else {
        throw new Error(
          `Failed to fetch utilities. Status: ${response.status}`
        );
      }
    }
    const json = await response.json();
    return json as Utility;
  } catch (error) {
    console.error("Error fetching utilities:", error);
    throw error;
  }
}