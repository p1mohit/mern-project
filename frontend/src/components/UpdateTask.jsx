import { useEffect, useState } from "react";
import "../style/addtask.css";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateTask() {
  const [taskdata, setTaskData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getTask(id);
  }, [id]);
  const getTask = async (id) => {
    const response= await fetch(`http://localhost:3200/task/${id}`,{
      credentials:"include",
    })

      const task = await response.json();

    if (task.result) {
      setTaskData(task.result);
    }
  };
const UpdateTask = async () => {
  console.log("function called", taskdata);
  const response = await fetch(`http://localhost:3200/task/${id}`,{
    method: "PUT",
    credentials:"include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: taskdata.title,
      description: taskdata.description,
    }),
  });

  console.log("Status:", response.status);

  const result = await response.json();

  console.log(result);

  if (result.success) {
    navigate("/");
  }
};
  return (
    <div className="container">
      <h1>Update Task</h1>

      <label htmlFor="title">Title</label>

      <input
        id="title"
        value={taskdata.title || ""}
        onChange={(event) =>
          setTaskData({
            ...taskdata,
            title: event.target.value,
          })
        }
      />

      <label htmlFor="description">Description</label>

      <textarea
        id="description"
        value={taskdata.description || ""}
        onChange={(event) =>
          setTaskData({
            ...taskdata,
            description: event.target.value,
          })
        }
      />

      <button
        className="submit"
        type="button"
        onClick={UpdateTask}
      >
        Update
      </button>
    </div>
  );
}
