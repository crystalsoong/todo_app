import { useState } from "react";

function TodoPage({ name }) {
  const [lists, setLists] = useState([]);
  const [currentList, setCurrentList] = useState(null);
  const [newTask, setNewTask] = useState("");

  const addList = () => {
    const listName = prompt("Enter a name for the new list:");
    if (!listName) return;
    const newList = { name: listName, tasks: [] };
    setLists([...lists, newList]);
    setCurrentList(newList);
  };

  const deleteList = (listName) => {
    const updated = lists.filter((l) => l.name !== listName);
    setLists(updated);
    if (currentList?.name === listName) setCurrentList(null);
  };

  const addTask = () => {
    if (!newTask.trim() || !currentList) return;
    const updated = lists.map((l) => {
      if (l.name === currentList.name) {
        return {
          ...l,
          tasks: [...l.tasks, { text: newTask.trim(), done: false }],
        };
      }
      return l;
    });
    setLists(updated);
    setNewTask("");
  };

  const toggleTask = (taskText) => {
    const updated = lists.map((l) => {
      if (l.name === currentList.name) {
        return {
          ...l,
          tasks: l.tasks.map((t) =>
            t.text === taskText ? { ...t, done: !t.done } : t
          ),
        };
      }
      return l;
    });
    setLists(updated);
  };

  const deleteTask = (taskText) => {
    const updated = lists.map((l) => {
      if (l.name === currentList.name) {
        return {
          ...l,
          tasks: l.tasks.filter((t) => t.text !== taskText),
        };
      }
      return l;
    });
    setLists(updated);
  };

  return (
    <div className="app">
      <h2>Hello, {name}!</h2>

      <div className="list-menu">
        <button onClick={addList}>New List</button>
        <div className="lists">
          {lists.map((l) => (
            <div key={l.name} className="list-item">
              <span
                onClick={() => setCurrentList(l)}
                style={{
                  cursor: "pointer",
                  fontWeight: currentList?.name === l.name ? "bold" : "normal",
                }}
              >
                {l.name}
              </span>
              <button onClick={() => deleteList(l.name)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      {currentList && (
        <div className="tasks">
          <h3>{currentList.name}</h3>
          <div className="add-task">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="New task"
            />
            <button onClick={addTask}>Add</button>
          </div>
          <ul>
            {lists
              .find((l) => l.name === currentList.name)
              ?.tasks.map((task, i) => (
                <li key={i}>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.text)}
                  />
                  <span
                    style={{
                      textDecoration: task.done ? "line-through" : "none",
                      marginLeft: "0.5rem",
                    }}
                  >
                    {task.text}
                  </span>
                  <button onClick={() => deleteTask(task.text)}>X</button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TodoPage;