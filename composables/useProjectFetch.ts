export interface ProjectUtility {
  id: number;
  utility: Utility;
}
export interface Project {
    id: number;
    projectTitle: string;
    projectUrl: string;
    description: string;
    improvements: string;
    lessonsLearned: string;
    notes: string;
    githubUrl: string;
    status: string;
    image1: string;
    image2: string;
    image3: string;
    image4: string;
    projectUtilities: ProjectUtility[];
  }
  
export async function fetchProjects(): Promise<Project[]> {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl;
  try {
    const response = await fetch(`${baseUrl}api/Profile/Projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "API_KEY": config.public.apiKey,
      },
    });
    const json = await response.json();
    return json as Project[];
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

export async function fetchProject(id: string): Promise<Project> {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl;
  try {
    const response = await fetch(`${baseUrl}api/Profile/Project?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "API_KEY": config.public.apiKey,
        }});
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