// src/components/Tasks/TaskItem.jsx

import React from "react";
import { useDrag } from "react-dnd";
import "./TaskItem.css";

const TaskItem = ({ task, onDelete, onView }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { _id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleEdit = () => {
    alert(`Edit task ${task.title}`);
  };

  const handleDelete = () => {
    onDelete(task._id);
  };

  const handleView = () => {
    onView(task._id);
  };

  return (
    <div ref={drag} className={`task-item ${isDragging ? "dragging" : ""}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>{task.createdAt}</p>
      <div className="task-actions">
        <button className="view-button" onClick={handleView}>
          View
        </button>
        <button className="edit-button" onClick={handleEdit}>
          Edit
        </button>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
