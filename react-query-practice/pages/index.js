import styles from '../styles/Home.module.css'
import axios from 'axios'
import {useQuery} from "react-query";
import {Fragment} from "react";
import Link from "next/link";

const  getPosts = async () =>{
  const { data } = await axios.get("http://localhost:5000/posts")
  console.log('### data', data)

  return data;
}

export default function Home() {
  const {data:posts, isLoading, isError, error} = useQuery("posts",getPosts,{
    staleTime: 5 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  })

  if(isError){
    return <div>{error.message}</div>
  }

  return (
    <>
      <nav style={{display: "flex"}}>
        <Link href="/parallelQueryPage">
          <a style={{marginRight: "1rem"}}> Parallel Queries Page</a>
        </Link>
        <Link href="/dependentQueryPage">
          <a style={{marginRight: "1rem"}}> Dependent Queries Page</a>
        </Link>
      </nav>

      <div style={{margin: '10px'}}>
        {isLoading ? (
          <div> Loading ...</div>
        ):(
          posts?.map((post)=>(
            <Fragment key={post.id}>
              <br/>
              <Link href={`/post/${post.id}`}>
                <a>
                  <div>id: {post.id}</div>
                  <div>title: {post.title}</div>
                  <div>content: {post.description.slice(0,100)} ... </div>
                  <div>createdAt: {post.author}</div>
                </a>
              </Link>

            </Fragment>
          ))
        )}
      </div>
    </>
  )
}
