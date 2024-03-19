// import { Technology } from "./technology.model";
import { Technology } from "./technology.js";
import { User } from "./user.js";

export interface Project {
    id: number;
    title: string;
    description: string;
    expectedStartDate: Date;
    expectedCompletionDate: Date;
    additionalDocumentation: Blob;
    technologies: Technology[];
    status: string;
    owner: User;
  }