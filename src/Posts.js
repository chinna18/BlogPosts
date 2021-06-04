import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
//import AddPost from './AddPost';

export default function Posts() {
  const history = useHistory();
  const [id, setId] = useState('');
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('1');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);

  const getUsers = async () => {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    const users = [];
    const userData = response.data;
    userData.forEach(user => {
      users.push(user.name);
    });
    setUsers(users);
    setUserData(userData);
  };

  const getPosts = async () => {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    let posts = response.data;
    setPosts(posts);
  };

  useEffect(() => {
    getUsers();
    getPosts();
  }, []);

  const createPost = async () => {
    const response = await axios.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        userId: userId,
        title: title,
        body: body
      }
    );
    posts.push(response.data);
    setPosts(posts);
    setUserId('1');
    setUserName('');
    setBody('');
    setTitle('');
  };

  const selectPost = post => {
    setId(post.id);
    setUserId(post.userId);
    for (var i in userData) {
      if (userData[i].id === post.userId) {
        setUserName(userData[i].name);
      }
    }
    setTitle(post.title);
    setBody(post.body);
  };

  const updatePost = async () => {
    const response = await axios.put(
      'https://jsonplaceholder.typicode.com/posts/' + id,
      {
        userId: userId,
        title: title,
        body: body
      }
    );
    const postIndex = posts.findIndex(post => post.id === id);
    posts[postIndex] = response.data;
    setId('');
    setUserId('1');
    setTitle('');
    setBody('');
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (id) {
      updatePost();
    } else {
      createPost();
    }
  };

  const deletePost = async postId => {
    let result = confirm('Are you sure you want to Delete this Post?');
    if (result) {
      let response = await axios.delete(
        'https://jsonplaceholder.typicode.com/posts/' + postId
      );
      let newPosts = posts.filter(post => post.id !== postId);
      setPosts(newPosts);
    }
  };

  const getComments = async postId => {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/comments?postId=' + postId
    );
    setComments(response.data);
  };

  return (
    <>
      <div className="container jumbotron">
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            {id ? (
              <>
                <label className="col-sm-2 col-form-label">Id</label>
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    type="text"
                    name="userId"
                    value={id}
                    onChange={event => {
                      setId(event.target.value);
                    }}
                    disabled
                  />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <br />
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">User Name</label>
            <div className="col-sm-6">
              <select
                className="form-control"
                name="userName"
                value={userName}
                onChange={event => {
                  setUserName(event.target.value);
                  let username = event.target.value;
                  let userid = '';
                  let userdata = [...userData];
                  for (var i in userdata) {
                    if (username === userdata[i].name) {
                      userid = userdata[i].id;
                      setUserId(userid);
                    }
                  }
                }}
              >
                {users.map((user, index) => {
                  return (
                    <option key={index} value={user}>
                      {user}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <br />

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">User Id</label>
            <div className="col-sm-6">
              <input
                className="form-control"
                type="text"
                name="userId"
                value={userId}
                disabled
              />
            </div>
          </div>
          <br />

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Title</label>
            <div className="col-sm-6">
              <input
                className="form-control"
                type="text"
                name="title"
                value={title}
                onChange={event => {
                  setTitle(event.target.value);
                }}
              />
            </div>
          </div>
          <br />

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Body</label>
            <div className="col-sm-6">
              <input
                className="form-control"
                type="text"
                name="body"
                value={body}
                onChange={event => {
                  setBody(event.target.value);
                }}
              />
            </div>
          </div>
          <br />
          <button type="submit" className="btn btn-success">
            {id ? 'Update Post' : 'Create Post'}
          </button>
        </form>
      </div>

      <div className="container">
        <br />
        {comments.map(comment => {
          return (
            <div key={comment.id}>
              <hr />
              <div>Post Id : {comment.postId}</div>
              <div>Id : {comment.id}</div>
              <div>Name : {comment.name}</div>
              <div>Email : {comment.email}</div>
              <div>Body : {comment.body}</div>
              <hr />
            </div>
          );
        })}
        <br />

        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>User Id</th>
              <th>Title</th>
              <th>Body</th>
              <th colSpan="4">Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => {
              return (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.userId}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => {}}>
                      View
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        selectPost(post);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        getComments(post.id);
                      }}
                    >
                      Comments
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
