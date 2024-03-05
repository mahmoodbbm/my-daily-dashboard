import { Task } from "@/common/types";

export class StorageService {
  private storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  getTasks(): Task[] {
    const tasks = localStorage.getItem(this.storageKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }
}

export const taskStorage = new StorageService("tasks");
