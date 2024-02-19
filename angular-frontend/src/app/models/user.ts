import { Technology } from "./technology";

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    status: string;
    technologies?: Technology[]; // Assuming Technology is another model/interface
  }
  