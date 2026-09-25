import { Fragment, useEffect, useState } from "react";
import "../style/list.css";
import { Link } from "react-router-dom";
export default function List() {
  const [taskData, setTaskData] = useState([]);
  const [selectTask,setSelectTask]=useState([])
 
  const getListData = async () => {
    let list = await fetch("http://localhost:3200/tasks",{
      credentials:'include'
    });
    list = await list.json();
    if (list.success) {
      setTaskData(list.result);
    }else{
      alert("try again sometime")
    }
  };
   useEffect(() => {
  getListData();
}, []);
  const deleteTask = async (id) => {
    let item = await fetch("http://localhost:3200/delete/" + id, { method: "delete",credentials:'include' });
    item = await item.json();
    if (item.success) {
      getListData();
    }else{
      alert("try again sometime")
    }
  }
  const selectAll=(event) =>{
    if(event.target.checked){
      let items = taskData.map((item) => item._id);
       setSelectTask(items)
    }else{
      setSelectTask([])
    }
  }
  const selectSingleItem = (id) => {
  if (selectTask.includes(id)) {
    let items = selectTask.filter((item) => item !== id);
    setSelectTask(items);
  } else {
    setSelectTask([id,...selectTask]);
};
  }
const deleteMultiple = async () => {
  const response = await fetch("http://localhost:3200/delete-multiple", {
    credentials:'include',
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(selectTask),
  });

  console.log("Status:", response.status);

  if (!response.ok) {
    console.log("Delete API failed:", await response.text());
    return;
  }

  const item = await response.json();

  console.log(item);

  if (item.success) {
    setSelectTask([]);
    getListData();
  }else{
    alert("Try after sometime")
  }
};
  return (
    <div className="list-container">
      <h1>TO DO List</h1>
     <div><button  onClick={deleteMultiple} className="top-delete delete-multiple">Delete</button></div>
      <ul className="task-list">
        <li className="list-header"><input onChange={selectAll} type="checkbox"/></li>
        <li className="list-header">S.No</li>
        <li className="list-header">Title</li>
        <li className="list-header">Description</li>
        <li className="list-header">Action</li>
        {
        taskData && 
          taskData.map((item, index) => (
            <Fragment key={item._id}>
              <li className="list-item"><input onChange={()=>selectSingleItem(item._id)} checked={selectTask.includes(item._id)} type="checkbox"/></li>
               <li className="list-item">{index + 1}</li>
              <li className="list-item">{item.title}</li>

              <li className="list-item">{item.description}</li>
              <li className="list-item">
                <button onClick={() => deleteTask(item._id)} className="delete-item">Delete</button>
                <Link to={"/update/" + item._id} className="update-item">Update</Link></li>
            </Fragment>
          ))}
      </ul>
    </div>
  )
}