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
