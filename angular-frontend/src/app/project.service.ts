import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from './models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private project: Project = {
      id: 0,
      title: 'Project Title',
      description: 'Project Description',
      expectedStartDate: new Date(), // Example: Current date
      expectedCompletionDate: new Date(), // Example: Current date
      additionalDocumentation: new Blob(), // Example: No additional documentation
      technologies: [], // Example: Empty array
      status: 'Pending', // Example: Initial status
      owner:  { 
        id: 0, 
        username: 'Owner', 
        email: 'owner@example.com', 
        password: 'password', 
        role: 'Owner', 
        status: 'Active'
        
      }
    }

  private projects: Project[] = [
    this.project
  ];

  
  



  constructor() { }

  getAllProjects(): Observable<Project[]> {
    return of(this.projects);
  }

  getProjectById(id: number): Observable<Project | undefined> {
    const project = this.projects.find(p => p.id === id);
    return of(project);
  }

  createProject(project: Project): Observable<void> {
    // Logic to create a project (not implemented in mock service)
    return of();
  }

  updateProject(id: number, project: Project): Observable<void> {
    // Logic to update a project (not implemented in mock service)
    return of();
  }

  deleteProject(id: number): Observable<void> {
    // Logic to delete a project (not implemented in mock service)
    return of();
  }
}
