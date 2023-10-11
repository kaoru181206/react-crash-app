import PostsList from "../components/PostsList";
import { Outlet } from "react-router-dom";

function Posts() {

  return (
    <>
      <Outlet />
      <main>
        <PostsList />
      </main>
    </>

  )
}

export default Posts;

// DataFetchを行う関数
// 画面の表示前に実行される
export async function loader() {
  const response = await fetch('http://localhost:8080/posts');
  const resData = await response.json();
  return resData.posts;
}
