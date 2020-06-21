import { AppProps } from 'next/app';
import { Store } from 'redux';

export type ComponentProps = {
  Component: AppProps;
  pageProps: AppProps;
  store: Store<string>;
};

export interface NodeProps {
  children: {
    Component: ComponentProps;
    pageProps: ComponentProps;
  };
}

export interface UserData {
  userId: string;
  Posts: Array<string>;
  Followings: Array<string>;
  Followers: Array<string>;
  isLoggedIn: boolean;
}

export interface UserCardProps {
  userData: UserData;
}

export interface PostData {
  isLoggedIn: boolean;
  imagePaths: Array<string>;
  mainPosts: MainPost;
}

export interface MainPost {
  id: number;
  img: string;
  User: {
    id: number;
    userId: string;
  };
  content: string;
  createdAt: string;
  comments: Array<string>;
}
