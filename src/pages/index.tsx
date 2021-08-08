import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import firebase from "firebase";
import admin from "../firebase/node";
import { Post, User } from "../types";

type Props = {
  posts: Post[];
};

const Page: NextPage<Props> = ({ posts: initPosts }) => {
  const { user, loadingUser } = useUser();
  const [posts, setPosts] = useState<Post[]>(initPosts);
  const [post, setPost] = useState("");

  const login = async () => {
    try {
      const user = await firebase.auth().signInAnonymously();
      console.log(user);
    } catch (err) {
      alert(err.message);
    }
  };

  const logout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (err) {
      alert(err.message);
    }
  };

  const createPost = () => {
    if (!user) {
      alert("ログインしてね");
      return;
    }

    try {
      const newPost = {
        id: firebase.firestore().collection("_").doc().id,
        userId: user.uid,
        body: post,
        createdAt: firebase.firestore.Timestamp.now(),
      };

      firebase.firestore().doc(`posts/${newPost.id}`).set(newPost);

      setPosts([
        ...posts,
        {
          ...newPost,
          createdAt: newPost.createdAt.toDate().toISOString(),
        },
      ]);
      setPost("");
    } catch (err) {
      alert(err.message);
    }
  };

  // const getPosts = () => {
  //   // const posts = await firebase.firestore().collection("posts").get();
  //   // setPosts(posts.docs.map((doc) => doc.data()));
  //   firebase
  //     .firestore()
  //     .collection("posts")
  //     .orderBy("createdAt", "asc")
  //     .onSnapshot((result) => setPosts(result.docs.map((doc) => doc.data())));
  // };

  if (loadingUser) {
    <p>loading</p>;
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Home</h1>
      {user ? (
        <button onClick={logout}>logout</button>
      ) : (
        <button onClick={login}>login</button>
      )}

      {user && <p>{user.uid}</p>}

      <h2>投稿一覧</h2>
      {posts?.map((post) => (
        <ul key={post.id}>
          <li>{post.body}</li>
          <li>{post.createdAt}</li>
        </ul>
      ))}
      {user && (
        <>
          <input
            type="text"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
          <button onClick={createPost}>投稿</button>
        </>
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = (
    await admin
      .firestore()
      .collection("posts")
      .orderBy("createdAt", "asc")
      .get()
  ).docs.map((doc) => ({
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate().toISOString(),
  })) as Post[];

  console.log(posts);

  return { props: { posts }, revalidate: 60 };
};

export default Page;