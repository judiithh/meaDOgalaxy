import { useState, useEffect } from "react";
import { Task } from "./components/Task";
import dirt from "./assets/dirt.png";
import logo from "./assets/logo.png";
import apple from "./assets/apple.png";
import sprout from "./assets/sprout.png";
import cherry from "./assets/cherry.png";
import orange from "./assets/orange.png";
import Celebration from "./components/Celebration";
import Coin from "./assets/coin.png";
import "./home.css";

export default function Home() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const [celebrate, setCelebrate] = useState(false);
  const [collected, setCollected] = useState(() => {
    return Number(localStorage.getItem("collected") || 0);
  });

  useEffect(() => {
    localStorage.setItem("collected", String(collected));
  }, [collected]);

  function addTodo() {
    const trimmed = input.trim();
    if (!trimmed) return;
    if (tasks.length >= 3) {
      alert("Finish other tasks before adding more!");
      return;
    }
    // include fruit: null initially
    setTasks((prevTasks) => [
      ...prevTasks,
      { name: trimmed, isComplete: false, fruit: null },
    ]);
    setInput("");
  }

  function collectTask(idx) {
    setTasks((prev) => prev.filter((_, i) => i !== idx));
    setCelebrate(true);
    setTimeout(() => setCelebrate(false), 2000);
    setCollected((c) => c + 1);
  }

  function evolveTask(idx) {
    const fruits = ["apple", "cherry", "orange"];
    const pick = fruits[Math.floor(Math.random() * fruits.length)];
    setTasks((prev) =>
      prev.map((t, i) =>
        i === idx ? { ...t, isComplete: true, fruit: pick } : t
      )
    );
  }

  function clearTasks() {
    setTasks([]);
  }

  function deleteTask(idx) {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== idx));
  }

  return (
    <div className="home-root">
      {celebrate && <Celebration />}

      <>
        <img src={Coin} className="coin" alt="coin" />
        <span className="coin-count">{collected}</span>
      </>
      <img src={logo} className="logo" alt="logo" />

      <div
        className="plots"
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          gap: 16,
        }}
      >
        {[0, 1, 2].map((i) => {
          const task = tasks[i];
          const imgSrc = task
            ? task.fruit === "apple"
              ? apple
              : task.fruit === "cherry"
              ? cherry
              : task.fruit === "orange"
              ? orange
              : sprout
            : dirt;

          return (
            <div key={i}>
              <img
                src={imgSrc}
                className="dirt"
                alt={task ? task.fruit || "sprout" : "dirt"}
              />
              <div style={{ minHeight: 24, marginTop: 8, color: "#fff" }}>
                {task ? task.name : ""}
              </div>
            </div>
          );
        })}
      </div>

      <div className="controls" style={{ marginTop: 16 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Input a task"
          size="30"
        />
        <button onClick={addTodo} style={{ marginLeft: 8 }}>
          Set Task
        </button>
      </div>

      <div className="task-list" style={{ marginTop: 20 }}>
        {tasks.map((task, idx) => (
          <Task
            key={idx}
            task={task}
            // Task component should call evolveTask() when its checkbox is checked
            evolveTask={() => evolveTask(idx)}
            deleteTask={() => deleteTask(idx)}
            collectTask={() => collectTask(idx)}
          />
        ))}
      </div>
    </div>
  );
}
