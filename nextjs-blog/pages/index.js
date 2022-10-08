import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';
import axios from 'axios';

export async function getStaticProps() {
  const { data: posts } = await axios('http://localhost:5000/posts');

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you ’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ id, title, description, createdAt }) => (
            <Link href={`/posts/${id}`} key={id}>
              <li className={utilStyles.listItem}>
                {id}
                <br />
                {title}
                <br />
                {description}
                <br />
                {createdAt}
                <hr />
              </li>
            </Link>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
