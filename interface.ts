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
	Comments: Array<CommentItem>;
	Likers: Array<{
		id: number;
	}>;
	Retweet: Retweet;
	Images: Array<Images>;
	RetweetId: number | null;
	User: {
		id: number;
		userId: string;
	};
	UserId: number;
	content: string;
	createdAt: string;
	id: number;
	updatedAt: string;
}

export interface Retweet {
	Images: Array<Images>;
	User: {
		id: number;
		userId: string;
	};
	UserId: number;
	content: string;
	createdAt: string;
	id: number;
	updatedAt: string;
}

export interface Images {
	PostId: number;
	createdAt: string;
	id: number;
	src: string;
	updatedAt: string;
}

export interface CommentItem {
	PostId: number;
	User: {
		id: number;
		userId: string;
	};
	UserId: number;
	content: string;
	createdAt: string;
	id: number;
	updatedAt: string;
	Comments: Array<string>;
}

export interface FollowItem {
	id: number;
	Follow: {
		createdAt: string;
		followerId: number;
		followingId: number;
		updatedAt: string;
	};
	userId: number;
}
