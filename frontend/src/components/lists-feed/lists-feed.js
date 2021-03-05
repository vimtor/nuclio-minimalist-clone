import React from "react";
import styles from "./lists-feed.module.css";
import ListItem from "./list-item/list-item";
import useLists from "../../hooks/use-lists";
import { useHistory } from "react-router-dom";

const ListsFeed = () => {
  const { lists, activeId, setActiveList, removeList, createList } = useLists();

  //If current path is not /lists, we redirect to list Page.
  const history = useHistory();
  let currentPath = history.location.pathname;
  const goToListPage = () => {
    history.push("/lists");
  };
  return (
    <section>
      <h3 className={styles.title}>Your lists</h3>
      <ul>
        {lists.map(({ _id, title }) => {
          return (
            <ListItem
              key={_id}
              title={title}
              active={_id === activeId}
              onClick={() => {
                if (currentPath !== "/lists") {
                  goToListPage();
                }
                setActiveList(_id);
              }}
              onRemove={(event) => {
                event.stopPropagation();
                removeList(_id);
              }}
            />
          );
        })}
      </ul>
      <button className={styles.button} onClick={createList}>
        + Add new list
      </button>
    </section>
  );
};

export default ListsFeed;
