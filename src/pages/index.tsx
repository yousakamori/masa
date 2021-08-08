import dynamic from "next/dynamic";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useUser } from "../context/userContext";
import firebase from "firebase";
import admin from "../firebase/node";
import { Post } from "../types";
import { Container } from "../components/ui";
import { Layout } from "../components/common";
import { Posts } from "../components/Posts/Posts";
import { Body, FormProps } from "../components/Form";

const Form = dynamic<FormProps>(
  () => import("../components/Form").then((mod) => mod.Form),
  { ssr: false }
);

type Props = {
  posts: Post[];
};

const Page: NextPage<Props> = ({ posts: initPosts }) => {
  const { user, loadingUser } = useUser();
  const [posts, setPosts] = useState<Post[]>(initPosts);

  const handleDeletePost = async (id: string) => {
    if (!confirm("本当に削除しますか?")) {
      return;
    }

    try {
      await firebase.firestore().collection("posts").doc(id).delete();
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      err;
    }
  };

  const handleCreatePost = async ({ body }: Body) => {
    if (!user) {
      alert("ログインしてね");
      return;
    }

    try {
      const newPost = {
        id: firebase.firestore().collection("_").doc().id,
        userId: user.uid,
        body,
        createdAt: firebase.firestore.Timestamp.now(),
      };

      await firebase.firestore().doc(`posts/${newPost.id}`).set(newPost);

      setPosts([
        {
          ...newPost,
          createdAt: newPost.createdAt.toDate().toISOString(),
        },
        ...posts,
      ]);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Layout>
      <Head>
        {/* TODO: OGP */}
        <title>人生＼(^o^)／ｵﾜﾀ</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Container className="max-w-3xl mt-6 bg-white">
        <Form
          loadingUser={loadingUser}
          user={user}
          createPost={handleCreatePost}
        />

        <div className="mt-6">
          <h2 className="text-xl font-semibold border-gray-800">メッセージ</h2>
          <Posts posts={posts} user={user} deletePost={handleDeletePost} />
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = (
    await admin
      .firestore()
      .collection("posts")
      .orderBy("createdAt", "desc")
      .get()
  ).docs.map((doc) => ({
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate().toISOString(),
  })) as Post[];

  return { props: { posts }, revalidate: 60 };
};

export default Page;
