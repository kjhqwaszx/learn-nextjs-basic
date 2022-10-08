import Layout from "../../components/layout";
import { useRouter } from "next/router";

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:5000/posts");
  const posts = await res.json();

  console.log("###", posts);

  return {
    props: {
      posts,
    },
  };
};

const ssr = ({ posts }) => {
  const router = useRouter();
  return (
    <Layout>
      <h1>Server Side Rendering</h1>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            {post.id}
            <br />
            {post.title}
            <br />
            {post.content}
            <br />
            {post.createdAt}
            <hr />
            <button onClick={() => router.push("/about")}></button>
          </div>
        );
      })}
    </Layout>
  );
};

export default ssr;
