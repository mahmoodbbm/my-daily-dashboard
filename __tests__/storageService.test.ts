import { StorageService } from "../services/storageService";

describe("StorageService", () => {
  const storageKey = "tasks";
  const mockTasks = [
    { id: 1, text: "Test task 1", completed: false },
    { id: 2, text: "Test task 2", completed: true },
  ];

  type MockLocalStorage = {
    [key: string]: string;
  };

  // Mock localStorage
  const localStorageMock = (() => {
    let store: MockLocalStorage = {};
    return {
      getItem: jest.fn((key: string) => store[key] || null),
      setItem: jest.fn((key: string, value) => {
        store[key] = String(value);
      }),
      clear: () => {
        store = {};
      },
    };
  })();

  beforeEach(() => {
    // Clear localStorage and reset mocks before each test
    localStorageMock.clear();
    jest.clearAllMocks();

    // Replace the global localStorage with the mock
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });
  });

  it("should retrieve tasks", () => {
    // Given
    localStorage.setItem(storageKey, JSON.stringify(mockTasks));

    // When
    const storageService = new StorageService(storageKey);
    const tasks = storageService.getTasks();

    // Then
    expect(tasks).toEqual(mockTasks);
    expect(localStorage.getItem).toHaveBeenCalledWith(storageKey);
  });

  it("should save tasks", () => {
    // Given
    const storageService = new StorageService(storageKey);

    // When
    storageService.saveTasks(mockTasks);

    // Then
    expect(localStorage.setItem).toHaveBeenCalledWith(
      storageKey,
      JSON.stringify(mockTasks)
    );
  });

  it("should return an empty array when there are no tasks", () => {
    // Given
    const storageService = new StorageService(storageKey);

    // When
    const tasks = storageService.getTasks();

    // Then
    expect(tasks).toEqual([]);
    expect(localStorage.getItem).toHaveBeenCalledWith(storageKey);
  });
});
