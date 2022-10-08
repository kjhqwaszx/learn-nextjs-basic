import Layout from '../../components/Layout';

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:5000/posts');
  const posts = await res.json();

  console.log('###', posts);

  return {
    props: {
      posts,
    },
  };
};
const ssg = ({ posts }) => {
  return (
    <Layout>
      <h1>Server Side Generate</h1>
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
          </div>
        );
      })}
    </Layout>
  );
};

export default ssg;
