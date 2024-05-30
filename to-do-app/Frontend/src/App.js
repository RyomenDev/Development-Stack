// import React from 'react';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  // const name = "Brad";
  // const x = true;
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    // {
    //   id: 1,
    //   text: "Doctors Appointment",
    //   day: "Feb 5th at 2:30pm",
    //   reminder: true,
    // },
    // {
    //   id: 2,
    //   text: "Meeting at School",
    //   day: "Feb 6th at 1:30pm",
    //   reminder: true,
    // },
    // {
    //   id: 3,
    //   text: "Food Shopping",
    //   day: "Feb 5th at 2:30pm",
    //   reminder: false,
    // },
  ]);

  useEffect(() => {
    // const fetchTasks=async ()=>{
    //   const res = await fetch('http://localhost:5000/tasks');
    //   const data= await res.json();

    //   // console.log(data);
    //   return data;
    // }

    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    // fetchTasks();
    getTasks();
  }, []);

  // fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    // console.log(data);
    return data;
  };

  // fetch tasks
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    // console.log(data);
    return data;
  };

  // Add task
  const addTask = async (task) => {
    // // console.log(task);
    // const id = Math.floor(Math.random() * 10000) + 1;
    // // console.log(id);
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
  };

  // delete task
  const deleteTask = async (id) => {
    // console.log("object", id);
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // toggle Reminder
  const toggleReminder = async (id) => {
    // console.log(id);
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      header: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        // task.id === id ? { ...task, reminder: !task.reminder } : task
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };
  return (
    <Router>
      <div className="container">
        {/*Class=Container  */}
        {/* <Header title={1} /> */}
        {/* <h1>Hello From react</h1> */}
        {/* <h2>
        Hello {name}. {x ? "yes" : "no "}
      </h2> */}
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        {/* shorter way of ternary without else */}
        {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? (
          <Tasks
            tasks={tasks}
            onDelete={deleteTask}
            onToggle={toggleReminder}
          />
        ) : (
          "No tasks to Show"
        )}

        <Routes>
        <Route path="/about" component={About} />
        </Routes>
        <Footer />

      </div>
    </Router>
    // <h2>hello</h2>  -- error
  );
}

// class App extends React.Component{
//   render(){
//     return <h1>Hello from a class.</h1>
//   }
// }

export default App;

// javascript react
// root class div wraps everything
