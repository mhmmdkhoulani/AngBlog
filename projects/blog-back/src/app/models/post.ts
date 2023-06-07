import { Category } from "./category";

export interface Post {
    title: string;
    permalink: string;
    category: { id: string, name: string };
    postImagePath: string;
    excerpt: string;
    content: string;
    isFeatured: boolean;
    views: number;
    status: string;
    createdAt: Date;
}
