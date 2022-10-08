import React, { useRef, useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import Link from 'next/link';

const postItem = async ({ id, title, author, description }) => {
  const { data } = await axios.post('http://localhost:5000/posts', {
    id,
    title,
    author,
    description,
  });
};

const Write = () => {
  const idRef = useRef(undefined);
  const titleRef = useRef(undefined);
  const contentRef = useRef(undefined);
  const authorRef = useRef(undefined);

  const [showLink, setShowLink] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();

    const id = idRef.current.value;
    const title = titleRef.current.value;
    const author = contentRef.current.value;
    const description = authorRef.current.value;

    if (id && title && author && description) {
      postItem({ id, title, author, description });
      setShowLink(true);
    }
  };

  return (
    <Layout>
      <h1>Write a post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          placeholder="id"
          required
          ref={idRef}
          key={1}
        />
        <br />
        <input
          type="text"
          key={2}
          name="author"
          placeholder="author"
          required
          ref={authorRef}
        />
        <br />
        <input
          key={3}
          type="text"
          name="title"
          placeholder="title"
          required
          ref={titleRef}
        />
        <br />
        <textarea
          type="text"
          name="content"
          placeholder="description"
          required
          ref={contentRef}
        />
        <br />
        <input type="submit" value="Create" key={4} />
      </form>
      {showLink && (
        <Link href={`/posts/${idRef.current.value}`}>
          <a>Created Post Link</a>
        </Link>
      )}
    </Layout>
  );
};

export default Write;
