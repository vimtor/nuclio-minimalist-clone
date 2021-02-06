import './lists-feed.css'

const ListsFeed = () => {
    return (
        <section className="lists-feed-container">
            <h3 className="lists-feed-title">Your lists</h3>
            <ul>
                <li className="lists-feed-list-item">
                    Untitled List <span className="lists-feed-list-item-tasks-left">(1)</span>
                    <svg className="lists-feed-list-item-cross" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z"></path>
                    </svg>
                </li>
            </ul>
            <button className="lists-feed-button">+ Add new list</button>
        </section>
    )
}

export default ListsFeed
