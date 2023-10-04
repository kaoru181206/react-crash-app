import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'
import NewPost, { action as newPostAction } from './routes/NewPost.jsx';
import RootLayout from './routes/RootLayout.jsx';
import Posts, { loader as postsLoaders } from './routes/Posts.jsx';

const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />, children: [
      { path: '/', element: <Posts />,
      loader: postsLoaders, 
      children: [{ path: '/create-post', element: <NewPost />, action: newPostAction }] }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
