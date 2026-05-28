import { useEffect, useState } from "react";
import API from "../api/axios";
import "../index.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);
  const [tags, setTags] = useState([]);
  const [editTask, setEditTask] = useState(null);

 
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTagChange = (tag) => {
    setTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const createTask = async () => {
    if (!title.trim()) return alert("Title required");

    const taskData = { title, description, tags };

    if (editTask) {
      await API.put(`/tasks/${editTask._id}`, taskData);
      setEditTask(null);
    } else {
      await API.post("/tasks", taskData);
    }

    setTitle("");
    setDescription("");
    setTags([]);
    fetchTasks();
  };

  const editTaskHandler = (task) => {
    setEditTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setTags(task.tags || []);
  };

  const cancelEdit = () => {
  setEditTask(null);
  setTitle("");
  setDescription("");
  setTags([]);
};

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const toggleStatus = async (task) => {
    await API.put(`/tasks/${task._id}`, {
      status: task.status === "Pending" ? "Completed" : "Pending",
    });
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="dashboard">

      <div className="navbar">
        <div className="navbar-left">
          <img src="/task_icon.png" className="navbar-icon" />
          <h1 className="navbar-title">Task Manager</h1>
        </div>

        <div className="navbar-right">
          <button onClick={() => setDarkMode(!darkMode)} className="btn theme-btn">
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          <button onClick={logout} className="btn logout-btn">
            Logout
          </button>
        </div>
      </div>


      <div className="card">
        <h2 className="create-task-title">Create Task</h2>

        <input
          className="task-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <textarea
          className="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

     
        <div className="checklist">
          {["Work", "Personal", "Important"].map((tag) => (
            <label key={tag}>
              <input
                type="checkbox"
                checked={tags.includes(tag)}
                onChange={() => handleTagChange(tag)}
              />
              {tag}
            </label>
          ))}
        </div>

       <div className="task-actions">
  <button onClick={createTask} className="btn add-btn">
    {editTask ? "Update Task" : "Add Task"}
  </button>

  {editTask && (
    <button onClick={cancelEdit} className="btn cancel-btn">
      Cancel
    </button>
  )}
</div>
      </div>

 
      <div className="filters">
        {["All", "Pending", "Completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`btn filter-btn ${filter === f ? "active" : ""}`}
          >
            {f}
          </button>
        ))}
      </div>

  
      <div className="task-grid">
        {tasks
          .filter((t) => (filter === "All" ? true : t.status === filter))
          .map((task) => (
            <div
              key={task._id}
              className={`task-card ${
                task.status === "Completed"
                  ? "completed-card"
                  : "pending-card"
              }`}
            >
              <div className="task-header">
                <h2 className="task-title">{task.title}</h2>

                <div className="top-tags">
                  {task.tags?.map((tag, i) => (
                    <span key={i} className="top-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <p className="task-desc">{task.description}</p>

              <p className="task-status">
                Status:
                <span
                  className={
                    task.status === "Completed" ? "done" : "pending"
                  }
                >
                  {task.status}
                </span>
              </p>

              <div className="task-footer">
                <button
                  onClick={() => toggleStatus(task)}
                  className="btn toggle-btn"
                >
                  {task.status === "Pending"
                    ? "Mark Complete"
                    : "Move to Pending"}
                </button>

                <div className="right-actions">
                  <button
                    onClick={() => editTaskHandler(task)}
                    className="btn edit-btn"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="btn delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Dashboard;