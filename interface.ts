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
  name: string;
  Post: Array<string>;
  Follwings: Array<string>;
  Followers: Array<string>;
  isLoggedIn: boolean;
}

export interface UserCardProps {
  userData: UserData;
}

export interface PostData {
  isLoggedIn: boolean;
  imagePaths: Array<string>;
  mainPosts: Array<{
    img: string;
    User: {
      id: number;
      name: string;
    };
    content: string;
    createdAt: string;
  }>;
}

export interface MainPost {
  img: string;
  User: {
    id: number;
    name: string;
  };
  content: string;
  createdAt: string;
}
