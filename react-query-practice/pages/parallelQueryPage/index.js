import React from 'react';
import axios from "axios";
import {useQueries, useQuery} from "react-query";

const getPost = async (query) => {
    console.log(query)
    const data = await axios.get(`http://localhost:5000/posts/${query.queryKey[1]}`)
    return data
}
const Index = () => {


    // Parallel Query
    useQuery(["post",1], getPost)
    useQuery(["post",2], getPost)
    useQuery(["post",3], getPost)

    //Dynamic Parallel Query
    useQueries([
        {queryKey: ["post",1], queryFn:getPost},
        {queryKey: ["post",2], queryFn:getPost},
        {queryKey: ["post",3], queryFn:getPost},
    ])

    return (
        <div>
            Parallel Queries Page
        </div>
    );
};

export default Index;

