import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import Link from 'next/link'
import utilStyles from '../styles/utils.module.css';

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }

export async function getServerSideProps() {
  const res = await fetch("http://localhost:5000/posts")
  const posts = await res.json()

  return {
    props: {
      posts,
    },
  };
}

export default function Home({posts}) {
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
          {posts.map(({ id, title, contents, createdAt  }) => (
            <Link href={`/posts/${id}`} replace>
              <li className={utilStyles.listItem} key={id}>
                {id}
                <br />
                {title}
                <br />
                {contents}
                <br />
                {createdAt}
                <hr/>
              </li>
            </Link>
          ))}
        </ul>
      </section>
    </Layout>
  );
}