// src/components/Tasks/TaskColumn.jsx

import React from "react";
import { useDrop } from "react-dnd";
import TaskItem from "./TaskItem";
import "./TaskColumn.css";

const TaskColumn = ({
  status,
  tasks,
  onTaskMove,
  onTaskDelete,
  onViewTask,
  onEditTask,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => onTaskMove(item._id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={`task-column ${isOver ? "highlight" : ""}`}>
      <h2>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={onTaskDelete}
          onView={onViewTask}
          onEdit={onEditTask}
        />
      ))}
    </div>
  );
};

export default TaskColumn;
