import { GetStaticProps, NextPage } from "next";
import { BsTrashFill } from "react-icons/bs";
import Head from "next/head";
import { useState } from "react";
import { useUser } from "../context/userContext";
import firebase from "firebase";
import admin from "../firebase/node";
import { Post } from "../types";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { Button, Container, Spinner } from "../components/ui";
import { Layout } from "../components/common";
import TextareaAutosize from "react-textarea-autosize";

type Props = {
  posts: Post[];
};

type Body = {
  body: string;
};

const Page: NextPage<Props> = ({ posts: initPosts }) => {
  const { user, loadingUser } = useUser();
  const [posts, setPosts] = useState<Post[]>(initPosts);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<Body>({ mode: "onChange" });

  const deletePost = async (id: string) => {
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

  const createPost = async ({ body }: Body) => {
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
        ...posts,
        {
          ...newPost,
          createdAt: newPost.createdAt.toDate().toISOString(),
        },
      ]);

      reset();
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
        {loadingUser && <Spinner className="mx-auto" />}
        {user && (
          <form onSubmit={handleSubmit(createPost)}>
            <p className="text-sm text-gray-600">
              あなたのIDは
              <span className="mx-1 font-semibold">{user.uid}</span>です
            </p>
            <TextareaAutosize
              {...register("body", {
                required: true,
                maxLength: {
                  value: 140,
                  message: "140文字以下で入力してください",
                },
              })}
              className="w-full px-2 py-1 mt-3 text-gray-800 placeholder-gray-500 placeholder-opacity-50 border border-gray-400 rounded-lg resize-none focus:outline-none"
              minRows={3}
              placeholder="メッセージを入力してください"
            />
            <p className="mt-3 text-sm text-red-500">{errors.body?.message}</p>
            <Button
              className="mt-3"
              type="submit"
              disabled={!isDirty || !isValid}
            >
              投稿する
            </Button>
          </form>
        )}

        <div className="mt-6">
          <h2 className="text-xl font-semibold border-gray-800">投稿一覧</h2>
          {posts?.map((post) => (
            <article
              className="px-3 py-2 mt-3 border border-gray-200 rounded-lg"
              key={post.id}
            >
              <aside className="flex justify-between">
                <div className="flex space-x-3">
                  <div className="text-sm font-semibold text-gray-700">
                    {post.userId}
                  </div>
                  <time className="text-sm text-gray-400">
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                      locale: ja,
                    })}
                  </time>
                </div>

                {post.userId === user?.uid && (
                  <div>
                    <button onClick={() => deletePost(post.id)}>
                      <BsTrashFill size={20} className="text-red-500" />
                    </button>
                  </div>
                )}
              </aside>
              <div className="mt-2 text-sm text-gray-700">
                {post.body.split("\n").map((str) => (
                  <>
                    {str}
                    <br />
                  </>
                ))}
              </div>
            </article>
          ))}
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
      .orderBy("createdAt", "asc")
      .get()
  ).docs.map((doc) => ({
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate().toISOString(),
  })) as Post[];

  return { props: { posts }, revalidate: 60 };
};

export default Page;
