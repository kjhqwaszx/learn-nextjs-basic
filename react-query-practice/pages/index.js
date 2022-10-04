import axios from 'axios'
import {QueryClient, useQuery, dehydrate} from "react-query";
import {Fragment} from "react";
import Link from "next/link";


const  getPosts = async () =>{
  const { data } = await axios.get("http://localhost:5000/posts")
  console.log('### data', data)

  return data;
}

export default function Home() {
  const {data:posts, isLoading, isError, error} = useQuery("posts",getPosts,{
    refetchOnWindowFocus: false
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
        <Link href="/paginatedQueryPage">
          <a style={{marginRight: "1rem"}}> Paginated Queries Page</a>
        </Link>
        <Link href="/infiniteQueryPage">
          <a style={{marginRight: "1rem"}}> Infinite Queries Page</a>
        </Link>
        <Link href="/todoPage1">
          <a style={{marginRight: "1rem"}}> Mutation Page1</a>
        </Link>
        <Link href="/todoPage2">
          <a style={{marginRight: "1rem"}}> Mutation Page2</a>
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

export const getServerSideProps = async() =>{
  const queryClient = new QueryClient()
  // queryKey: posts로 데이터를 서버단에서 prefetch시켜 놓는다.
  // 클라이언트에서는 해당 쿼리키를 바로 사용할 수 있으며 화면이 mount된 이후 refetch가 일어난다.
  // 클라이언트에서 refetch가 발생하는 것을 방지하려면 refetchOnMount를 false로 설정하거나 staleTime을 Infinity로 설정하면 된다.
  await queryClient.prefetchQuery("posts", getPosts)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

