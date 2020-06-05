import { AppProps } from 'next/app';

export type ComponentProps = {
  Component: AppProps;
  pageProps: AppProps;
};

export interface NodeProps {
  children: {
    Component: ComponentProps;
    pageProps: ComponentProps;
  };
}

export interface UserData {
  id: string;
  Post: Array<string>;
  Follwings: Array<string>;
  Followers: Array<string>;
  isLoggedIn: boolean;
}

export interface UserCardProps {
  userData: UserData;
}
