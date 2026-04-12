/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * API FETCH FUNCTIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * All fetch functions used in TanStack Query hooks are centralized here.
 * This keeps API logic decoupled from React components and enables easy mocking/testing.
 * 
 * Base API: JSONPlaceholder (https://jsonplaceholder.typicode.com/) — free, no auth required
 * 
 * Benefits of centralizing fetch:
 * • Single source of truth for API endpoints
 * • Easy to add global error handling or request/response transformation
 * • Simplifies testing and mocking
 * • All mutations and queries reference these typed functions
 * 
 * Note: All functions accept optional abortSignal for query cancellation support.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

const API_BASE = "https://jsonplaceholder.typicode.com";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TYPE DEFINITIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  username: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  total: number;
  totalPages: number;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FETCH FUNCTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// POSTS
export async function fetchPosts(
  signal?: AbortSignal
): Promise<Post[]> {
  const res = await fetch(`${API_BASE}/posts`, { signal });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function fetchPost(
  id: number,
  signal?: AbortSignal
): Promise<Post> {
  const res = await fetch(`${API_BASE}/posts/${id}`, { signal });
  if (!res.ok) throw new Error(`Failed to fetch post ${id}`);
  return res.json();
}

export async function fetchPostsByUser(
  userId: number,
  signal?: AbortSignal
): Promise<Post[]> {
  const res = await fetch(`${API_BASE}/posts?userId=${userId}`, { signal });
  if (!res.ok) throw new Error(`Failed to fetch posts for user ${userId}`);
  return res.json();
}

export async function fetchPaginatedPosts(
  page: number = 1,
  limit: number = 10,
  signal?: AbortSignal
): Promise<PaginatedResponse<Post>> {
  const start = (page - 1) * limit;
  const res = await fetch(
    `${API_BASE}/posts?_start=${start}&_limit=${limit}`,
    { signal }
  );
  if (!res.ok) throw new Error("Failed to fetch paginated posts");
  const items = await res.json();
  return {
    items,
    page,
    total: 100, // JSONPlaceholder has ~100 posts
    totalPages: Math.ceil(100 / limit),
  };
}

export async function createPost(
  post: Omit<Post, "id">,
  signal?: AbortSignal
): Promise<Post> {
  const res = await fetch(`${API_BASE}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
    signal,
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
}

export async function updatePost(
  id: number,
  post: Partial<Post>,
  signal?: AbortSignal
): Promise<Post> {
  const res = await fetch(`${API_BASE}/posts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
    signal,
  });
  if (!res.ok) throw new Error("Failed to update post");
  return res.json();
}

export async function deletePost(
  id: number,
  signal?: AbortSignal
): Promise<void> {
  const res = await fetch(`${API_BASE}/posts/${id}`, {
    method: "DELETE",
    signal,
  });
  if (!res.ok) throw new Error("Failed to delete post");
}

// USERS
export async function fetchUsers(
  signal?: AbortSignal
): Promise<User[]> {
  const res = await fetch(`${API_BASE}/users`, { signal });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function fetchUser(
  id: number,
  signal?: AbortSignal
): Promise<User> {
  const res = await fetch(`${API_BASE}/users/${id}`, { signal });
  if (!res.ok) throw new Error(`Failed to fetch user ${id}`);
  return res.json();
}

// COMMENTS
export async function fetchPostComments(
  postId: number,
  signal?: AbortSignal
): Promise<Comment[]> {
  const res = await fetch(`${API_BASE}/posts/${postId}/comments`, { signal });
  if (!res.ok) throw new Error(`Failed to fetch comments for post ${postId}`);
  return res.json();
}

export async function fetchComments(
  signal?: AbortSignal
): Promise<Comment[]> {
  const res = await fetch(`${API_BASE}/comments`, { signal });
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
}

// INFINITE SCROLL HELPER
export async function fetchInfinitePosts(
  pageParam: number = 0,
  signal?: AbortSignal
): Promise<{ posts: Post[]; nextCursor: number }> {
  const limit = 10;
  const start = pageParam * limit;
  const res = await fetch(
    `${API_BASE}/posts?_start=${start}&_limit=${limit}`,
    { signal }
  );
  if (!res.ok) throw new Error("Failed to fetch posts");
  const posts = await res.json();
  return {
    posts,
    nextCursor: pageParam + 1,
  };
}
