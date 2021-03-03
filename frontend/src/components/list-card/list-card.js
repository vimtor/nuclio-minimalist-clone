import React from "react";
import useActiveList from "../../hooks/use-active-list";
import styles from "./list-card.module.css";
import TaskList from "./task-list/task-list";
import CardHeader from "./card-header/card-header";
import CardFooter from "./card-footer/card-footer";

const ListCard = () => {
  const { loading, createTask } = useActiveList();

  if (loading) {
    return null;
  }

  return (
    <div className={styles.card}>
      <CardHeader />
      <input
        className={styles.addTask}
        type="text"
        placeholder="Add new task"
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            createTask(event.target.value);
            event.target.value = "";
          }
        }}
      />
      <TaskList />
      <CardFooter />
    </div>
  );
};

export default ListCard;
