import {useEffect, useState} from 'react'
import useActiveList from "../../hooks/use-active-list";

const ListCard = () => {
    const {loading, updateTitle, createTask, title, tasks} = useActiveList()

    const [innerTitle, setInnerTitle] = useState(title)

    useEffect(() => {
      setInnerTitle(title)
    }, [title])

    if (loading) {
        return null;
    }

    const handleTitleChange = event => {
        updateTitle(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                value={innerTitle}
                onChange={e => setInnerTitle(e.target.value)}
                onBlur={handleTitleChange}
            />
            <input
                type="text"
                placeholder="Add new task"
                onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                        createTask(event.target.value)
                    }
                }}
            />
            <ul>
                {tasks?.map(({_id, title}) => {
                    return <li key={_id}>{title}</li>
                })}
            </ul>
            <button>Clear all completed</button>
        </div>
    )
}

export default ListCard
