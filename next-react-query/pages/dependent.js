import axios from "axios";
import { useQuery } from "react-query";

const getPost = async ({queryKey}) => {
  const { data } = await axios.get(
    `http://localhost:5000/posts/${queryKey[1]}`
  );
  return data;
};

const getUser = async ({queryKey}) => {
  const { data } = await axios.get(
    `http://localhost:5000/users/${queryKey[1]}`
  );
  return data;
};


const DependentQueriesPage = () => {
  const { data: user } = useQuery(["user", "jae_han"], getUser);
  const { data: post } = useQuery(["post", user?.postId], getPost, {
    enabled: !!user?.postId,
  });

  console.log({ user });
  console.log({ post });

  return <div>Dependent Queries Page</div>;
};


export default DependentQueriesPage;