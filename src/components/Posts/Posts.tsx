import React from "react";
import { BsTrashFill } from "react-icons/bs";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { Post, User } from "../../types";

export type PostsProps = {
  posts: Post[];
  user: User | null;
  deletePost: (id: string) => void;
};

export const Posts: React.VFC<PostsProps> = ({ posts, user, deletePost }) => {
  return (
    <>
      {posts?.map((post) => (
        <article
          className={`px-3 py-2 mt-3 border rounded-lg ${
            user?.uid === post.userId ? "border-blue-200" : "border-gray-200"
          }`}
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
    </>
  );
};
