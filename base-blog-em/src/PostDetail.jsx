import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "./api";
import "./PostDetail.css";


export function PostDetail({ post, deleteMutation, updateMutation }) {
  // replace with useQuery
  

  // const data = [];
  const { data, isLoading, isError } = useQuery({
    queryKey: ['comments', post.id],
    queryFn: () => fetchComments(post.id),
  });

  if (isLoading) return <div>Loading comments...</div>;
  if (isError) return <div>Error loading comments.</div>;

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div><button onClick={() => deleteMutation.mutate(post.id)}>Delete</button> 
      {deleteMutation.isPending && <p className="loading">Deleting...</p>}
      {deleteMutation.isError && <p className="error">Error deleting post.</p>}
      {deleteMutation.isSuccess && <p className="success">Post deleted successfully.</p>}
      </div>
      <div><button onClick={() => updateMutation.mutate(post.id)}>Update title</button></div>
      {updateMutation.isPending && <p className="loading">Updating...</p>}
      {updateMutation.isError && <p className="error">Error updating post.</p>}
      {updateMutation.isSuccess && <p className="success">Post updated successfully.</p>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
