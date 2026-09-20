import { useState } from "react";
import "../style/addtask.css";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const [taskdata, setTaskData] = useState();
  const navigate = useNavigate();
  const handleAddTask = async (event) => {
    event.preventDefault();
    console.log(taskdata);
    let result = await fetch("http://localhost:3200/add-task", {
      method: "POST",
      body: JSON.stringify(taskdata),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    if (result.success) {
       navigate('/')
      console.log("New task added");
    }
  };
  return (
    <div className="container">
      <h1>Add New Task</h1>

      <form onSubmit={handleAddTask}>
        <label htmlFor="title">Title</label>

        <input
          onChange={(event) =>
            setTaskData({
              ...taskdata,
              title: event.target.value,
            })
          }
          type="text"
          name="title"
          id="title"
          placeholder="Enter New Task"
        />
        <label htmlFor="description">Description</label>
        <textarea
          onChange={(event) =>
            setTaskData({
              ...taskdata,
              description: event.target.value,
            })
          }
          rows={4}
          id="description"
          name="description"
          placeholder="Enter description"
        />
        <button className="submit" type="submit">
          Add New Task
        </button>
      </form>
    </div>
  );
}
