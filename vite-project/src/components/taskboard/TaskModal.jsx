import React from "react";
import "./TaskModal.css";

const TaskModal = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <p>Created At: {task.createdAt}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TaskModal;
