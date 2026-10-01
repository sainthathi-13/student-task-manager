import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Add a new task
  const addTask = () => {
    if (task.trim() === "") {
      alert("Please enter a task");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  // Add task when pressing Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  // Mark task as completed/pending
  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  // Calculate statistics
  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  // Search + filter
  const filteredTasks = tasks.filter((item) => {
    const matchesSearch = item.text
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "pending" && !item.completed) ||
      (filter === "completed" && item.completed);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>Student Task Manager</h1>
        <p>Organize your academic tasks easily</p>
      </header>

      {/* Add Task */}
      <div className="task-input">
        <input
          type="text"
          placeholder="Enter your task"
          value={task}
          onChange={(event) => setTask(event.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Statistics */}
      <div className="stats">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div>
            <strong>{tasks.length}</strong>
            <span>Total Tasks</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⌛</div>
          <div>
            <strong>{pendingTasks}</strong>
            <span>Pending</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div>
            <strong>{completedTasks}</strong>
            <span>Completed</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="controls">
        <div className="search-box">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "pending" ? "active" : ""}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>

          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📄</div>

            <p>
              {tasks.length === 0
                ? "No tasks added yet."
                : "No matching tasks found."}
            </p>
          </div>
        ) : (
          filteredTasks.map((item) => (
            <div
              className={`task ${item.completed ? "task-completed" : ""}`}
              key={item.id}
            >
              <div className="task-content">
                <button
                  className={`check-button ${
                    item.completed ? "checked" : ""
                  }`}
                  onClick={() => toggleTask(item.id)}
                  aria-label="Complete task"
                >
                  {item.completed ? "✓" : ""}
                </button>

                <span
                  className={item.completed ? "completed-text" : ""}
                  onClick={() => toggleTask(item.id)}
                >
                  {item.text}
                </span>
              </div>

              <button
                className="delete-button"
                onClick={() => deleteTask(item.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;