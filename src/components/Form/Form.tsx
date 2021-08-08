import React from "react";
import { useForm } from "react-hook-form";
import { Button, Spinner } from "../../components/ui";
import TextareaAutosize from "react-textarea-autosize";
import { Post, User } from "../../types";

export type Body = Pick<Post, "body">;

export type FormProps = {
  loadingUser: boolean;
  user: User | null;
  createPost: (body: Body) => void;
};

export const Form: React.VFC<FormProps> = ({
  loadingUser,
  user,
  createPost,
}) => {
  const {
    register,
    handleSubmit,

    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<Body>({ mode: "onChange" });

  return (
    <>
      {loadingUser && <Spinner className="mx-auto" />}
      {user && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(createPost)().then(() => reset());
          }}
        >
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
    </>
  );
};
