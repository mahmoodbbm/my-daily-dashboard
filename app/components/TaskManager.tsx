"use client";

import { useState, useEffect } from "react";
import { taskStorage } from "../../services/storageService";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState<string>("");

  useEffect(() => {
    setTasks(taskStorage.getTasks());
  }, []);

  const addTask = () => {
    const newTask: Task = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
    };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    taskStorage.saveTasks(newTasks);
    setNewTaskText(""); // Clear the input after adding
  };

  const deleteTask = (id: number) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    taskStorage.saveTasks(newTasks);
  };

  const toggleTaskCompletion = (id: number) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
    taskStorage.saveTasks(newTasks);
  };

  return (
    <div>
      <input
        type="text"
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            {task.text}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
