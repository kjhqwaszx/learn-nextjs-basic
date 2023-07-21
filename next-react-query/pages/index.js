import axios from "axios";
import {useQuery} from "react-query";
import {Fragment} from "react";
import Link from "next/link";

const getPosts = async () => {
  const { data } = await axios.get("http://localhost:5000/posts");
  return data;
};
export default function Home() {

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery("posts", getPosts, {staleTime: 5 * 1000});


  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <nav style={{ display: "flex" }}>
        <Link href="/parallel">
          <a style={{ marginRight: "1rem" }}>Parallel Queries Page</a>
        </Link>
        <Link href="/dependent">
          <a style={{ marginRight: "1rem" }}>Dependent Queries Page</a>
        </Link>
        <Link href="/todos">
          <a style={{ marginRight: "1rem" }}>Mutation Page</a>
        </Link>
      </nav>

      <br />

      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          posts?.map((post) => (
            <Fragment key={post.id}>
              <br />
              <Link href={`/post/${post.id}`}>
                <a>
                  <div>id: {post.id}</div>
                  <div>제목: {post.title}</div>
                  <div>작성자: {post.author}</div>
                  <div>내용: {post.description.slice(0, 100)}...</div>
                </a>
              </Link>
              <br />
              <hr />
            </Fragment>
          ))
        )}
      </div>
    </>
  )
}
