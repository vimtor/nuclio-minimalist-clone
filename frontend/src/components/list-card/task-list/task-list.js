import styles from "./task-list.module.css";
import CloseButton from "../../close-button/close-button";
import useActiveList from "../../../hooks/use-active-list";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TaskList = () => {
    let {removeTask, tasks, uncheckTask, completeTask, updateTasksOrder} = useActiveList();

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        items.map((item, index) => item.index = index);
        updateTasksOrder(items);
        // console.log(items);

    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="task">
                {(provided, snapshot) =>(
                    <ul className="{styles.list} task" {...provided.droppableProps} ref={provided.innerRef}>
                        {tasks?.sort((a, b) => a.index - b.index).map(({_id, title, completed}, index) => {
                            return (
                                <Draggable  key={_id}  draggableId={_id} index={index}>
                                    {(provided) => (
                                        <li className={styles.item} key={_id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <input type="checkbox" checked={completed} onChange={() => {
                                                if (completed) {
                                                    uncheckTask(_id)
                                                } else {
                                                    completeTask(_id)
                                                }
                                            }}/>
                                            {title}
                                            <CloseButton onClick={() => removeTask(_id)} className={styles.cross}/>
                                        </li>
                                    )}
                                </Draggable>

                            )
                        })}
                        {provided.placeholder}
                    </ul>

                )
                }
            </Droppable>
        </DragDropContext>
    )
}

export default TaskList
