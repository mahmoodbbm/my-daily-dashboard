import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import TaskManager from "../app/components/TaskManager";
import { taskStorage } from "../services/storageService";

jest.mock("../services/storageService", () => ({
  taskStorage: {
    getTasks: jest.fn().mockReturnValue([
      { id: 1, text: "Test Task 1", completed: false },
      { id: 2, text: "Test Task 2", completed: true },
    ]),
    saveTasks: jest.fn(),
  },
}));

const mockTasks = [
  { id: 1, text: "Test Task 1", completed: false },
  { id: 2, text: "Test Task 2", completed: true },
];

describe("TaskManager Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("loads and displays tasks correctly", () => {
    // Given

    // When
    render(<TaskManager />);

    // Then
    expect(taskStorage.getTasks).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    expect(screen.getByText("Test Task 2")).toBeInTheDocument();
  });

  test("allows users to add a new task", async () => {
    // Given

    // When
    render(<TaskManager />);
    const inputElement = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByTitle("Add task");
    await userEvent.type(inputElement, "New Task");
    fireEvent.click(addButton);

    // Then
    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  test("allows users to delete a task", () => {
    // Given

    // When
    render(<TaskManager />);
    const deleteButtons = screen.getAllByTitle("Delete task");
    fireEvent.click(deleteButtons[0]); // Delete the first task

    // Then
    expect(taskStorage.saveTasks).toHaveBeenCalledWith(
      mockTasks.filter((task) => task.id !== 1)
    );
  });

  test("allows users to toggle task completion", () => {
    // Given

    // When
    render(<TaskManager />);
    const toggleButtons = screen.getAllByTitle("Finished");
    fireEvent.click(toggleButtons[0]); // Toggle the completion of the first task

    // Then
    expect(taskStorage.saveTasks).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, completed: true }),
      ])
    );
  });

  test("toggles visibility of the task manager", () => {
    // Given

    // When
    render(<TaskManager />);
    const toggleVisibilityButton = screen.getByTitle("Show/Hide task manager");
    fireEvent.click(toggleVisibilityButton);

    // Then
    expect(screen.queryByText("Task Manager")).not.toBeInTheDocument();
    fireEvent.click(toggleVisibilityButton); // Show again
    expect(screen.getByText("Task Manager")).toBeInTheDocument();
  });
});
