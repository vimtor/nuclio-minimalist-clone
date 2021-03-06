import React from "react";
import { createContext, useEffect, useState } from "react";
import api from "../helpers/api";
import useLists from "../hooks/use-lists";

export const ActiveListContext = createContext({
  loading: false,
  title: "",
  tasks: [],
  _id: null,
  updateTitle: () => {},
  createTask: () => {},
  uncheckTask: () => {},
  completeTask: () => {},
  updateTasksOrder: () => {},
  setTasks: () => {},
});

const ActiveListProvider = ({ children }) => {
  const { loading, updateList, activeId } = useLists();
  const [activeList, setActiveList] = useState(null);

  const refreshList = async () => {
    api.fetchOneList(activeId).then(setActiveList);
    window.history.pushState("", "", `/lists/${activeList}`);
  };

  useEffect(() => {
    if (activeId) {
      refreshList();
    }
  }, [activeId]);

  const updateTasksOrder = async (newTaskList) => {
    await api.updateList(activeId, { tasks: newTaskList });
  };

  const updateTitle = (title) => {
    updateList(activeId, { title });
  };

  const updateDueDateTask = async (id, dueDate) => {
    const newList = await api.updateTask(activeId, id, { dueDate: dueDate });
    setActiveList(newList);
  };

  const createTask = async (title) => {
    const newList = await api.createTask(activeId, title);
    setActiveList(newList);
  };

  const uncheckTask = async (id) => {
    const newList = await api.updateTask(activeId, id, {
      completed: false,
      completed_date: null,
    });
    setActiveList(newList);
  };

  const completeTask = async (id) => {
    const newList = await api.updateTask(activeId, id, {
      completed: true,
      completed_date: new Date(),
    });
    setActiveList(newList);
  };

  const removeTask = async (id) => {
    await api.removeTask(activeId, id);
    const newTasks = activeList.tasks.filter(({ _id }) => _id !== id);
    setActiveList({
      ...activeList,
      tasks: newTasks,
    });
  };

  const removeCompletedTasks = async () => {
    await api.removeManyTasks(activeId, { completed: true });
    const newTasks = activeList.tasks.filter(({ completed }) => !completed);
    setActiveList({
      ...activeList,
      tasks: newTasks,
    });
  };

  const setTasks = (newTasks) => {
    setActiveList({
      ...activeList,
      tasks: newTasks,
    });
  };

  return (
    <ActiveListContext.Provider
      value={{
        loading,
        ...activeList,
        setTasks,
        updateTitle,
        updateDueDateTask,
        removeTask,
        refreshList,
        removeCompletedTasks,
        createTask,
        completeTask,
        uncheckTask,
        updateTasksOrder,
      }}
    >
      {children}
    </ActiveListContext.Provider>
  );
};

export default ActiveListProvider;
