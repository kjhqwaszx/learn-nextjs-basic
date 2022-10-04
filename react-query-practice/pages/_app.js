import '../styles/globals.css'
import {useState} from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";

function MyApp({ Component, pageProps }) {

  // queryClient 인스턴스만들기. queryClientProvider의 props로 전달.
  const [queryClient] = useState(()=> new QueryClient())

  return(
    <>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        {/*개발도구는 dev일 경우에만 나타난다.*/}
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right"></ReactQueryDevtools>
      </QueryClientProvider>
    </>

  )
}

export default MyApp

