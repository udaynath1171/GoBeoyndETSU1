import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { ProjectService } from '../project.service';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] | undefined;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    // this.loadProjects();
  }

  // loadProjects(): void {
  //   this.projectService.getAllProjects().subscribe(
  //     projects => {
  //       this.projects = projects;
  //     },
  //     error => {
  //       console.error('Error loading projects:', error);
  //     }
  //   );
  // }

  // deleteProject(id: number): void {
  //   if (confirm('Are you sure you want to delete this project?')) {
  //     this.projectService.deleteProject(id).subscribe(
  //       () => {
  //         console.log('Project deleted successfully!');
  //         this.loadProjects(); // Reload projects after deletion
  //       },
  //       error => {
  //         console.error('Error deleting project:', error);
  //       }
  //     );
  //   }
  // }
}
