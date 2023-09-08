import React, { useState } from "react";


// components
import Footer from "./components/Footer";
import Header from "./components/Header";


import TaksList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Modal from "./components/Modal";

// interfaces
import { ITask } from "./interfaces/Task";

// css 
import styles from "./App.module.css";


function App() {

  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);

  const deletTask = (id: number) => {
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id;
      })
    );
  };

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector("#modal")
    if(display) {
      modal!.classList.remove("hide");
    } else {
      modal!.classList.add("hide");
    }
  };

  const editTask = (task: ITask): void => {
    hideOrShowModal(true);
    setTaskToUpdate(task);
  };

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updateTask: ITask = {id, title, difficulty}
    
    const updateItens = taskList.map((task) => {
      return task.id === updateTask.id ? updateTask : task
    })

    setTaskList(updateItens);
    hideOrShowModal(false);
  }

  return (
    <div >
      <Modal children={<TaskForm  btnText="Editar Tarefa" taskList={taskList} task={taskToUpdate} handleUpdate={updateTask} /> }  />
      <Header />
      <main className={styles.main}>
        <div>
          <h2>O que você vai fazer?</h2>
          <TaskForm btnText="Criar tarefa" taskList={taskList} setTaskList={setTaskList}  />
        </div>
        <div>
          <h2>Suas tarefas: </h2>
          <TaksList taskList={taskList} handleDelete={deletTask} handleEdit={editTask}  />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
