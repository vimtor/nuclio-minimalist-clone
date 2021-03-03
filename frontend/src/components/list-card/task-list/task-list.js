import React from "react";
import styles from "./task-list.module.css";
import CloseButton from "../../close-button/close-button";
import useActiveList from "../../../hooks/use-active-list";
import DateButton from "../../date-button/date-button";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskList = () => {
  const {
    removeTask,
    tasks,
    uncheckTask,
    updateDueDateTask,
    completeTask,
    updateTasksOrder,
  } = useActiveList();

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateTasksOrder(items);
    tasks = items;
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="task">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {tasks?.map(({ _id, title, completed, dueDate }, index) => {
              return (
                <Draggable key={_id} draggableId={_id} index={index}>
                  {(provided) => (
                    <li
                      className={styles.list}
                      key={_id}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className={styles.left}>
                        <input
                          type="checkbox"
                          checked={completed}
                          onChange={() => {
                            if (completed) {
                              uncheckTask(_id);
                            } else {
                              completeTask(_id);
                            }
                          }}
                        />
                        {title}
                      </div>
                      <div clasName={styles.right}>
                        <DateButton
                          date={dueDate}
                          updateDueDate={(date) => updateDueDateTask(_id, date)}
                        />
                      </div>
                      <CloseButton
                        onClick={() => removeTask(_id)}
                        className={styles.cross}
                      />
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
