// FUNCTION FOR FETCHING EDUCATION FROM API
export interface Education {
    id: number;
    educationTitle: string;
    schoolName: string;
    description: string;
    startDate: string;
    endDate: string;
  }
  
  export async function fetchEducations(): Promise<Education[]> {
    const config = useRuntimeConfig();
    const baseUrl = config.public.apiBaseUrl;
    try {
      const response = await fetch(
        baseUrl + "/Profile/ProfileEducations", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ApiKey": config.public.apiKey,
          },
      });
      const json = await response.json();
      return json as Education[];
    } catch (error) {
      console.error("Error fetching education:", error);
      throw error;
    }
  }
  
  export async function fetchEducation(id: string): Promise<Education> {
    const config = useRuntimeConfig();
    const baseUrl = config.public.apiBaseUrl;
    try {
      const response = await fetch(
        baseUrl + `/Profile/ProfileEducation?id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ApiKey": config.public.apiKey,
          },
      });
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
    const config = useRuntimeConfig();
    const baseUrl = config.public.apiBaseUrl;
    try {
      const response = await fetch(
        baseUrl + "/Profile/ProfileExperiences", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ApiKey": config.public.apiKey,
          },
      });
      const json = await response.json();
      return json as Experience[];
    } catch (error) {
      console.error("Error fetching experience:", error);
      throw error;
    }
  }
  
  export async function fetchExperience(id: string): Promise<Experience> {
    const config = useRuntimeConfig();
    const baseUrl = config.public.apiBaseUrl;
    try {
      const response = await fetch(
        baseUrl + `/Profile/ProfileExperience?id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ApiKey": config.public.apiKey,
          },
      });
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
    const config = useRuntimeConfig();
    const baseUrl = config.public.apiBaseUrl;
    try {
      const response = await fetch(baseUrl + "/Profile/Skills", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ApiKey": config.public.apiKey,
        },
      });
      const json = await response.json();
      return json as Skill[];
    } catch (error) {
      console.error("Error fetching skills:", error);
      throw error;
    }
  }
  
  export async function fetchSkill(id: string): Promise<Skill> {
    const config = useRuntimeConfig();
    const baseUrl = config.public.apiBaseUrl;
    try {
      const response = await fetch(
        baseUrl + `/Profile/Skill?id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ApiKey": config.public.apiKey,
          },
      });
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
    const config = useRuntimeConfig();
    const baseUrl = config.public.apiBaseUrl;
    try {
      const response = await fetch(baseUrl + "/Profile/Utilities", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ApiKey": config.public.apiKey,
        },
      });
      const json = await response.json();
      return json as Utility[];
    } catch (error) {
      console.error("Error fetching utilities:", error);
      throw error;
    }
  }
  
  export async function fetchUtility(id: string): Promise<Utility> {
    const config = useRuntimeConfig();
    const baseUrl = config.public.apiBaseUrl;
    try {
      const response = await fetch(
        baseUrl + `/Profile/Utility?id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ApiKey": config.public.apiKey,
          },
      });
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