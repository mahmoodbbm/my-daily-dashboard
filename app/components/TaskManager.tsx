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

  const addTask = (event: React.FormEvent) => {
    event.preventDefault();
    const newTask: Task = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
    };
    const newTasks = [newTask, ...tasks];
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
    <div className="w-full">
      <form onSubmit={(e) => addTask(e)} className="flex items-center">
        <input
          className="appearance-none w-48 bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a new task"
        />
        <button
          className="ml-1 flex-shrink-0 bg-indigo-500 hover:bg-indigo-700 border-indigo-500 hover:border-indigo-700 text-base border-4 text-white py-2 px-2 rounded"
          type="submit"
        >
          Add Task
        </button>
      </form>

      <ul className="mt-2 w-full">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="my-2 p-4 border-2 border-indigo-400 w-full shadow rounded-lg flex justify-between items-center hover:bg-indigo-100"
          >
            <div className="flex items-center">
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              />
              {task.text}
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
