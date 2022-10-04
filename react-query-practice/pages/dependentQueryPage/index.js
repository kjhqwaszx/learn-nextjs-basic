import React from 'react';
import axios from "axios";

const getPost = async (queryKey) => {
    const {data} = await axios.get(`http://localhost:5000/posts/${queryKey[1]}`)
    return data
}

const getUser = async (queryKey) =>{
    const {data} = await axios.get(`http://localhost:5000/users/${queryKey[1]}`)
    return data
}

const Index = () => {
    /**
     * 첫 번째 useQuery(getUser)를 실행해 값이 있을경우
     * 두 번쨰 useQuery의 enabled 옵션이 true로 바뀌면서 실행된다.
     * 의존관계가 존재하기 때문에 Dependent Queries라고 한다.
     */
    const { data: user } = useQuery(["user", "kkiri@example.com"], getUser);

    const { data: post } = useQuery(["post", user?.postId], getPost, {
        enabled: !!user?.postId, // user.postId가 존재하면 true
    });

    return (
        <div>

        </div>
    );
};

export default Index;


