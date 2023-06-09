import React from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query"

// 가라로 만든 데이터
const POSTS = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];

function Test2() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: 1000 * 60 * 5 },
    },
  });

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: (obj) =>
      wait(1000).then(() => {
        console.log(obj);
        return [...POSTS];
      }),
  });

  const newPostMutation = useMutation({
    mutationFn: (title) => {
      return wait(1000).then(() => {
        const newPost = { id: crypto.randomUUID(), title };
        POSTS.push(newPost);
        return newPost;
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    if (title) {
      newPostMutation.mutate(title);
      event.target.reset();
    }
  };

  if (postsQuery.isLoading) return <h1>Loading...</h1>;
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

  return (
    <div>
      {postsQuery.data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <button disabled={newPostMutation.isLoading} onClick={() => newPostMutation.mutate("New Post")}>
        Add New
      </button>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="title" placeholder="Enter post title" />
        <input type="submit" value="Post" />
      </form>
    </div>
  );
}

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default Test2;
