import NewPost from "./NewPost";
import Post from "./Post";
import classes from './PostsList.module.css';
import Modal from "./Modal";
import { useEffect, useState } from "react";

function PostsList({ isPosting, onStopPosting }) {
    // postデータを保持
    const [posts, setPosts] = useState([]);
    // 読込状態を保持
    const [isFetching, setIsFetchin] = useState(false);

    useEffect(() => {
        async function fetchPosts() {
            setIsFetchin(true);
            const response = await fetch('http://localhost:8080/posts');
            const resData = await response.json();
            setPosts(resData.posts);
            setIsFetchin(false);
        }
        fetchPosts();
    }, []);

    function addPostHandler(postData) {
        fetch('http://localhost:8080/posts', {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setPosts((prevState) => [postData, ...prevState]);
    }

    return (
        <>
            {isPosting &&
                <Modal onClose={onStopPosting}>
                    <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
                </Modal>
            }

            {!isFetching && posts.length > 0 &&
                <ul className={classes.posts}>
                    {posts.map(post => <Post key={post.body} author={post.author} body={post.body} />)}
                </ul>}

            {!isFetching && posts.length === 0 &&
                <div style={{ textAlign: 'center', color: 'white' }}>
                    <h2>There are no posts yet.</h2>
                    <p>Start adding some!</p>
                </div>}
            
            {isFetching && <div style={{textAlign: 'center', color: 'white'}}>
                <p>Loading posts</p></div>}
        </>

    )
}

export default PostsList;