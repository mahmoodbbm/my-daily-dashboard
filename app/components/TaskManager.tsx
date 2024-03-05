"use client";

import { useState, useEffect } from "react";
import { taskStorage } from "../../services/storageService";
import Image from "next/image";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState<string>("");
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => setIsVisible(!isVisible);

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
    <div>
      {isVisible && (
        <div className="lg:w-96 w-80 p-4 bg-fuchsia-300 h-screen overflow-y-auto fixed top-4 right-4 shadow-[-10px_10px_0px_rgba(0,0,0,0.1)]">
          <h2 className="font-bold text-lg mb-2">Task Manager</h2>
          <form onSubmit={(e) => addTask(e)} className="flex items-center">
            <input
              className="appearance-none w-48 bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="Add a new task"
            />
            <button
              title="Add task"
              className="ml-1 flex-shrink-0 bg-indigo-500 hover:bg-indigo-700 border-indigo-500 hover:border-indigo-700 text-base border-4 text-white py-2 px-2 rounded"
              type="submit"
            >
              <Image
                className="invert"
                src="/img/plus.svg"
                alt="Add task"
                width="24"
                height="24"
              />
            </button>
          </form>

          <ul className="mt-2 w-full">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="my-4 py-4 pl-2 w-full flex justify-between items-start hover:bg-fuchsia-100 border-b border-gray-400"
              >
                <div className="flex items-start">
                  <input
                    title="Finished"
                    id={`task-${task.id}`}
                    className="mr-2 mt-2"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                  />
                  <label
                    htmlFor={`task-${task.id}`}
                    className={`flex-1 text-lg ${
                      task.completed ? "line-through" : ""
                    }`}
                  >
                    {task.text}
                  </label>
                </div>
                <button
                  title="Delete task"
                  onClick={() => deleteTask(task.id)}
                  className="min-w-8"
                >
                  <Image
                    src="/img/trash.svg"
                    alt="Delete"
                    width="24"
                    height="24"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        title="Show/Hide task manager"
        onClick={toggleVisibility}
        className="fixed p-2 top-6 right-6 bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded"
      >
        {isVisible ? (
          <Image
            className="invert"
            src="/img/eye-slash.svg"
            alt="Hide"
            width="24"
            height="24"
          />
        ) : (
          <Image
            className="invert"
            src="/img/eye.svg"
            alt="show"
            width="24"
            height="24"
          />
        )}
      </button>
    </div>
  );
};

export default TaskManager;
