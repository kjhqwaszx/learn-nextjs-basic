import React, {Fragment, useState} from 'react';
import axios from "axios";
import {useQuery} from "react-query";

const getPost = async (query) => {
  console.log(query.queryKey)
  const {data} = await axios.get(`http://localhost:5000/posts?_limit=2&_page=${query.queryKey[1]}`)
  return data
}

const Index = () => {
  const [page, setPage] = useState(1)
  /**
   * keepPreviousData 옵션
   * 페이지 이동 시 새로운 데이터를 받아오는 과정에서 Loading... 문구가 노출된다. 이는 사용자경험을 저해할 수 있으므로
   * 이전 데이터를 가지고 있다가, 새로운 데이터로 변경해 준다.
   */
  //
  const {data:posts, isLoading} = useQuery(["paginated",page],getPost, {keepPreviousData:true})
  return (
    <div>
      {isLoading?(
        <div>Loading...</div>
      ):(
        posts?.map((post) => (
          <Fragment key={post.id}>
            <div>id: {post.id}</div>
            <div>제목: {post.title}</div>
            <div>내용: {post.description.slice(0,100)} ... </div>
            <div>작성자: {post.author}</div>
          </Fragment>
          )
        )
      )}
      <button
        onClick={() => {setPage((page) => page-1)}}
        disabled={page===1}> Prev Page
      </button>

      <button
        onClick={() => {setPage((page) => page+1)}}
        disabled={page===5}> Next Page
      </button>
    </div>
  );
};

export default Index;