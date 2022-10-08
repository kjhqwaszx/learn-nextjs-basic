import Layout from '../../components/layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';

export async function getStaticPaths() {
  // posts 데이터 Fetch
  const { data: posts } = await axios.get('http://localhost:5000/posts');

  //pre-render 시킬 Path 설정
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  console.log(paths);

  // 빌드가 실행될 때 pre-render 시켜 정적 파일로 저장. ( Fallback Option : false, true, blocking)
  // false인 경우에는 path에 없는 값이 들어오면 404에러를 내려준다.
  // true일 경우에는 화면을 새로 그려준다. 그려주는 동안에는 별도의 처리를 통해 Loading 화면을 보여준다.
  // 현재 소스에서는 useRouter를 사용해 Loading 페이지를 보여준 후에 그려진 화면을 보여주는데, 데이터가 없으니 Layout 페이지만 보여진다.
  // 그려지는 화면은 정적으로 생성되는건 아니고, 다시 들어가면 그린다.
  return {
    paths,
    fallback: 'blocking',
  };
}
export const getStaticProps = async ({ params }) => {
  const { data: post } = await axios.get(
    `http://localhost:5000/posts/${params.id}`,
  );
  console.log('###post', post);
  //해당 페이지에 props로 전달
  return { props: { post } };
};

export default function Post({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    const getText = async () => {
      const res = await fetch('/api/hello');
      const data = await res.json();
      // alert(data.text)
    };
    getText();
  }, []);

  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      {post.id}
      <br />
      {post.title}
      <br />
      {post.description}
      <br />
    </Layout>
  );
}
