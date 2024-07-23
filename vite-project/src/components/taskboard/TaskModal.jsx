import React from "react";
import "./TaskModal.css";

const TaskModal = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{task.title}</h2>
        <h3>Description : {task.description}</h3>
        <h3>
          Created At{" : "} {new Date(task.createdAt).toDateString()}
        </h3>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TaskModal;
