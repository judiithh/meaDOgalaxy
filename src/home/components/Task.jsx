import React from "react";
import "./Task.css";

export function Task({ task, evolveTask, deleteTask, collectTask }) {
  const handleCheckbox = (e) => {
    if (e.target.checked) evolveTask();
  };

  const handleButton = () => {
    if (task?.isComplete) {
      // call collect handler if provided, otherwise fallback to delete
      if (collectTask) collectTask();
      else deleteTask();
    } else {
      deleteTask();
    }
  };

  const label = task?.isComplete ? "Collect" : "Delete";

  return (
    <div
      className="task-row"
      style={{ display: "flex", alignItems: "center", gap: 12 }}
    >
      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input
          type="checkbox"
          checked={!!task?.isComplete}
          onChange={handleCheckbox}
        />
        <span>{task?.name}</span>
      </label>

      <button type="button" onClick={handleButton} style={{ marginLeft: 12 }}>
        {label}
      </button>
    </div>
  );
}
