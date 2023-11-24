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