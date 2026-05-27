import { useEffect, useState } from "react";
import API from "../api/axios";
import "../index.css";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  const [darkMode, setDarkMode] =
    useState(false);

  const [tags, setTags] =
    useState([]);


  // DARK MODE
  useEffect(() => {

    if (darkMode) {

      document.documentElement
        .classList.add("dark");

    } else {

      document.documentElement
        .classList.remove("dark");
    }

  }, [darkMode]);


  // FETCH TASKS
  const fetchTasks = async () => {

    try {

      const res =
        await API.get("/tasks");

      setTasks(res.data);

    } catch (error) {

      console.log(error);
    }
  };


  // LOAD TASKS
  useEffect(() => {

    fetchTasks();

  }, []);


  // HANDLE TAGS
  const handleTagChange = (tag) => {

    if (tags.includes(tag)) {

      setTags(
        tags.filter((t) => t !== tag)
      );

    } else {

      setTags([...tags, tag]);
    }
  };


  // CREATE TASK
  const createTask = async () => {

    if (!title) {

      alert("Title is required");

      return;
    }

    try {

      await API.post("/tasks", {

        title,
        description,
        tags
      });

      setTitle("");
      setDescription("");
      setTags([]);

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };


  // DELETE TASK
  const deleteTask = async (id) => {

    try {

      await API.delete(`/tasks/${id}`);

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };


  // TOGGLE STATUS
  const toggleStatus = async (task) => {

    try {

      await API.put(

        `/tasks/${task._id}`,

        {
          status:
            task.status === "Pending"
              ? "Completed"
              : "Pending"
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };


  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";
  };


  return (

    <div className="dashboard">

      {/* HEADER */}
      <div className="header">

        <h1 className="title">
          <img
    src="/task_icon.png"
    alt="task"
    className="task-image"
  />
  
  Task Manager Dashboard
        </h1>

        <div className="header-actions">

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="btn theme-btn"
          >
            {darkMode
              ? "☀️ Light"
              : "🌙 Dark"}
          </button>

          <button
            onClick={logout}
            className="btn logout-btn"
          >
            Logout
          </button>

        </div>

      </div>


      {/* CREATE TASK */}
      <div className="card">

        <h2 className="Create_task">Create New Task</h2>

        {/* TITLE */}
        <input
          type="text"
          placeholder="Enter task title..."
          className="task-input"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Enter task description..."
          className="task-description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        {/* CHECKBOX TAGS */}
        <div className="checklist">

          <label>
            <input
              type="checkbox"
              checked={tags.includes(
                "Important"
              )}
              onChange={() =>
                handleTagChange(
                  "Important"
                )
              }
            />
            Important
          </label>

          <label>
            <input
              type="checkbox"
              checked={tags.includes(
                "Personal"
              )}
              onChange={() =>
                handleTagChange(
                  "Personal"
                )
              }
            />
            Personal
          </label>

          <label>
            <input
              type="checkbox"
              checked={tags.includes(
                "Work"
              )}
              onChange={() =>
                handleTagChange("Work")
              }
            />
            Work
          </label>

        </div>

        {/* BUTTON */}
        <button
          onClick={createTask}
          className="btn add-btn"
        >
          Add Task
        </button>

      </div>


      {/* FILTER BUTTONS */}
      <div className="filters">

        <button
          onClick={() =>
            setFilter("All")
          }
          className={`btn filter-btn
          ${filter === "All"
              ? "active"
              : ""}
          `}
        >
          All
        </button>

        <button
          onClick={() =>
            setFilter("Pending")
          }
          className={`btn filter-btn
          ${filter === "Pending"
              ? "active"
              : ""}
          `}
        >
          Pending
        </button>

        <button
          onClick={() =>
            setFilter("Completed")
          }
          className={`btn filter-btn
          ${filter === "Completed"
              ? "active"
              : ""}
          `}
        >
          Completed
        </button>

      </div>


      {/* TASK LIST */}
      <div className="grid">

        {tasks
          .filter((task) => {

            if (filter === "All")
              return true;

            return task.status === filter;
          })
          .map((task) => (

            <div
              key={task._id}
              className="card task-card"
            >

              <h2>{task.title}</h2>

              <p className="description">
                {task.description}
              </p>


              {/* TAGS */}
              <div className="tags">

                {task.tags?.map(
                  (tag, index) => (

                    <span
                      key={index}
                      className="tag"
                    >
                      {tag}
                    </span>
                  )
                )}

              </div>


              {/* STATUS */}
              <p className="status-text">

                Status:

                <span
                  className={
                    task.status ===
                      "Completed"
                      ? "done"
                      : "pending"
                  }
                >
                  {task.status}
                </span>

              </p>


              {/* BUTTONS */}
              <div className="row">

                <button
                  onClick={() =>
                    toggleStatus(task)
                  }
                  className="btn toggle-btn"
                >
                  {task.status ===
                    "Pending"
                    ? "Mark Complete"
                    : "Move to Pending"}
                </button>

                <button
                  onClick={() =>
                    deleteTask(task._id)
                  }
                  className="btn delete-btn"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

      </div>

    </div>
  );
}

export default Dashboard;