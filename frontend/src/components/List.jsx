import { Fragment, useEffect, useState } from "react";
import "../style/list.css";
import { Link } from "react-router-dom";
export default function List() {
  const [taskData, setTaskData] = useState();
  const [selectTask,setSelectTask]=useState([])
  const getListData = async () => {
    let list = await fetch("http://localhost:3200/tasks");
    list = await list.json();
    if (list.success) {
      setTaskData(list.result);
    }
  };
    useEffect(() => {
    getListData()
  }, []);
  
  const deleteTask = async (id) => {
    let item = await fetch("http://localhost:3200/delete/" + id, { method: "delete" });
    item = await item.json();
    if (item.success) {
      getListData();
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
  console.log(selectTask);
  }
  return (
    <div>
      <h1>TO DO List</h1>
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