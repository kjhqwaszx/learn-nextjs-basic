import React, {Fragment} from 'react';
import axios from "axios";
import {useInfiniteQuery} from "react-query";

// pageParam은 useInfiniteQuery의 getNextPageParam 리턴값이 들어간다.
const getPost = async ({pageParam = 1}) => {
  const {data} = await axios.get(`http://localhost:5000/posts?_limit=2&_page=${pageParam}`)
  return data
}

/**
 * [ useInfiniteQuery ]
 * hasNextPage: 가져올 데이터가 있는지 확인하는 useInfiniteQuery 의 flag 이다. getNextPageParam() 함수에서  undefined 가 떨어질 때 false.
 * fetchNextPage: getNextPageParam에서 반환한 페이지 정보를 바탕으로 query function인 getPost를 호출하는 함수이다.
 * Load More 버튼을 클릭하면 pages.length +1 값이 getPost의 PageParam으로 전달되어 새로운 데이터를 받아온다.
 */
const Index = () => {
  const {data: postPages, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery("infinite", getPost, {
    getNextPageParam:(_lastPage, pages) =>{
      if(pages.length === 4){
        return undefined
      }
      return pages.length + 1
    }
  })

  return (
    <div>
      {isLoading?(
        <div>Loading...</div>
      ):(
        postPages?.pages.map((posts,i)=>(
          <Fragment key={i}>
            {
              posts?.map((post) => (
                <Fragment key={post.id}>
                  <div>id: {post.id}</div>
                  <div>제목: {post.title}</div>
                  <div>내용: {post.description.slice(0,100)} ... </div>
                  <div>작성자: {post.author}</div>
                  <br/>
                </Fragment>
              ))
            }
          </Fragment>
        ))
      )}
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage}> Load More
      </button>
    </div>
  );
};

export default Index;