import { useState } from "react";
import NewPost from "./NewPost";
import Post from "./Post";
import classes from './PostsList.module.css';
import Modal from "./Modal";

function PostsList({isPosting, onStopPosting}) {
    const [enteredBody, setEnteredBody] = useState('');
    const [enteredAuthor, setEnteredAuthor] = useState('');

    function bodyChangeHandler(event) {
        setEnteredBody(event.target.value);
    }

    function authorChangeHandler(event) {
        setEnteredAuthor(event.target.value);
    }

    return (
        <>
            {isPosting && 
                <Modal onClose={onStopPosting}>
                    <NewPost onBodyChange={bodyChangeHandler} onAuthorChange={authorChangeHandler} />
                </Modal>
            }

            <ul className={classes.posts}>
                <Post author='MAXIMILIAN' body='React.js is awesome!' />
                <Post author='MANUEL' body='Check out the full course!' />
            </ul>
        </>

    )
}

export default PostsList;