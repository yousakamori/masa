import React from "react";
import firebase from "firebase";
import { Carousel } from "../Carousel";
import { SiTwitter, SiNiconico, SiYoutube, SiGithub } from "react-icons/si";
import { Button, Container } from "../../ui";
import { useUser } from "../../../context/userContext";

export type LayoutType = {
  children?: React.ReactNode;
};

export const Layout: React.VFC<LayoutType> = ({ children }) => {
  const { user } = useUser();
  const login = async () => {
    try {
      const user = await firebase.auth().signInAnonymously();
      console.log(user);
    } catch (err) {
      alert(err.message);
    }
  };

  const logout = async () => {
    if (!confirm("sessionが削除されますがログアウトしますか?")) {
      return;
    }
    try {
      await firebase.auth().signOut();
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <>
      <header className="bg-white">
        <Container className="flex items-center justify-between h-16">
          <h1 className="text-3xl font-extrabold text-teal-600 font-palette-mosaic">
            人生オワタ
          </h1>
          <div className="flex items-center space-x-5">
            {user ? (
              <Button color="secondary" onClick={logout}>
                ログアウト
              </Button>
            ) : (
              <Button color="primary" onClick={login}>
                匿名でログイン
              </Button>
            )}
          </div>
        </Container>
      </header>
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <Container className="flex items-center justify-between h-16">
          <a
            target="_blank"
            rel="noreferrer"
            className="flex items-center"
            href="https://www.nicovideo.jp/user/97308510"
          >
            <SiNiconico size={25} className="text-gray-600" />
            <span className="hidden ml-2 text-gray-500 sm:inline hover:text-teal-400">
              ニコニコ
            </span>
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            className="flex items-center"
            href="https://twitter.com/finishedlife444"
          >
            <SiTwitter size={25} className="text-blue-500" />
            <span className="hidden ml-2 text-gray-500 sm:inline hover:text-teal-400">
              Twitter
            </span>
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            className="flex items-center"
            href="https://www.youtube.com/channel/UCYAx7T6JI8aonFO3slZlRDg"
          >
            <SiYoutube size={25} className="text-red-500" />
            <span className="hidden ml-2 text-gray-500 sm:inline hover:text-teal-400">
              Youtube
            </span>
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            className="flex items-center"
            href="https://github.com/MASA20201203"
          >
            <SiGithub size={25} className="text-black" />
            <span className="hidden ml-2 text-gray-500 sm:inline hover:text-teal-400">
              Github
            </span>
          </a>
        </Container>
      </nav>

      <main>
        <Carousel />
        {children}
      </main>
      <footer className="flex justify-center py-6 mt-6 border-t border-gray-200">
        <p className="text-xl font-extrabold text-teal-600 font-palette-mosaic">
          人生オワタ
        </p>
      </footer>
    </>
  );
};
