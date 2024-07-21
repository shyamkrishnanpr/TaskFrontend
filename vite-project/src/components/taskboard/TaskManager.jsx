// src/components/Tasks/TaskManager.jsx

import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskColumn from "./TaskColumn";
import TaskModal from "./TaskModal";
import AddTaskModal from "./AddTaskModal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Navbar from "../navbar/Navbar";
import "./TaskManager.css";
import {
  createTask,
  getTasks,
  updateTask,
  deletTask,
} from "../../services/api";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.log("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleTaskMove = async (taskId, newStatus) => {
    try {
      updateTask(taskId, { status: newStatus });
      let updatedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.log("Error moving task:", error);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const createdTask = await createTask(newTask);
      setTasks([...tasks, createdTask]);
    } catch (error) {
      console.log("Error adding task:", error);
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      deletTask(taskId);
      let updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  const handleViewTask = async (taskId) => {
    const task = tasks.find((task) => task._id == taskId);
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Navbar />
      <DndProvider backend={HTML5Backend}>
        <div className="task-manager">
          <button
            className="add-task-button"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Task
          </button>

          <div className="task-columns">
            <TaskColumn
              status="todo"
              tasks={tasks.filter((task) => task.status === "todo")}
              onTaskMove={handleTaskMove}
              onTaskDelete={handleTaskDelete}
              onViewTask={handleViewTask}
            />
            <TaskColumn
              status="in-progress"
              tasks={tasks.filter((task) => task.status === "in-progress")}
              onTaskMove={handleTaskMove}
              onTaskDelete={handleTaskDelete}
              onViewTask={handleViewTask}
            />
            <TaskColumn
              status="done"
              tasks={tasks.filter((task) => task.status === "done")}
              onTaskMove={handleTaskMove}
              onTaskDelete={handleTaskDelete}
              onViewTask={handleViewTask}
            />
          </div>
        </div>
      </DndProvider>
      <TaskModal task={selectedTask} onClose={handleCloseModal} />
      {isAddModalOpen && (
        <AddTaskModal
          onClose={() => setIsAddModalOpen(false)}
          onAddTask={handleAddTask}
        />
      )}
    </>
  );
};

export default TaskManager;
