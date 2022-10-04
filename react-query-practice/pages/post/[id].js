import React from 'react';
import axios from "axios";
import {useRouter} from "next/router";
import {useQuery, useQueryClient} from "react-query";

const  getPost = async (query) =>{
    const { data } = await axios.get(`http://localhost:5000/posts/${query.queryKey[1]}`)
    console.log('### data', data)

    return data;
}

const postDetail = () => {
    const router = useRouter()
    const {id:postId} = router.query

    // _app.js에서 생성한 queryClient를 가져온다. 이 객체를 이용해 캐시된 데이터를 사용한다.
    const queryClient = useQueryClient()

    const{data:post, isLoading} = useQuery(["post",postId],getPost, {
        initialData: () =>{
            const posts = queryClient.getQueryData("posts")
            const post = postId ? posts.find((post) => post.id === +postId) : null
            if(!post){
                return undefined
            }
            return post
        }
    })

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : post ? (
                <>
                    <div>id: {post.id}</div>
                    <div>제목: {post.title}</div>
                    <div>작성자: {post.author}</div>
                    <div>내용: {post.description}</div>
                </>
            ) : null}
        </div>
    );
};

    export default postDetail;