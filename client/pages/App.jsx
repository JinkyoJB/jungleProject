import React from 'react';
// import { Router, Route, Routes, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query"
//pages
// import Home from "../pages/Home/Home.jsx";
// import Mypage from "../pages/Mypage/Mypage.jsx"

//가라로 만든 데이터
const POSTS = [
    { id: 1, title: "Post 1" },
    { id: 2, title: "Post 2" },
]

function App() {
    //query hook: React Query의 쿼리 훅은 웹 API로부터 데이터를 가져오는 작업을 간편하게 만들어주는 도구
    //useQueryClient: 데이터의 로딩 상태, 에러 상태, 가져온 데이터 등을 반환
    // const queryClient = useQueryClient()
    //5분이상 페이지가 멈춰있으면 cash refresh
    const queryClient = new QueryClient( { defaultOptions: {queryies: {staleTime: 1000 * 60 * 5 }}})

    //useQuery: 가장 기본적인 쿼리훅, 웹 API로부터 데이터를 가져오는 함수와, 그 함수를 실행하는 데 필요한 키를 인자로 받습니다. 
    //POSTS에 있는걸 1초마다 가져와서 posts라는 key에 넣으세요.
    //staleTime: 1000,  //refetchInterval: 1000, 하면 1초마다 상태 재 post
    const postsQuery = useQuery({
        queryKey: ["posts"],
        queryFn: (obj) => wait(1000).then(() => {
            console.log(obj)
            return [...POSTS]
        }),
    })

    //useMutation: 데이터를 변경하는 함수를 인자로 받음, 비동기적으로 실행.
    //타겟은 'title' 하나, 성공하면 useQueryClient 업데이트
    const newPostMutation = useMutation({
        mutationFn: title => {
        return wait(1000).then(() => 
            POSTS.push({ id: crypto.randomUUID(), title })
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"])
        },
    })
    //loading이나 error가 있으면 return
    if (postsQuery.isLoading) return <h1>Loading...</h1>
    if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>
    
    //화면에 띄울건데 postsQuery.data.는 서버에서 가져온 게시글 목록을 담고 있음. map은 렌더링하는 작업을 수행
    return (
        <div>
            {postsQuery.data.map(post => (
                <div key={post.id}>{post.title}</div>
            ))}
            <button disabled={newPostMutation.isLoading} onClick={() => newPostMutation.mutate("new Post")}>
                Add New
            </button>
        <form> 
            <input type="file" name="image" accept="image/*" />
            <input type="submit" value="Upload Image" />
      </form>
    </div>

    // <div className="App">
    //     <Routes>
    //         <Route path="/" element={<Home />}/>
    //         <Route path="/Mypage" element={<Mypage />} />
    //     </Routes>
        
    // </div>
    )
}

//new Promise는 JavaScript에서 비동기 작업을 처리할 때 사용하는 객체, setTimeout은 JavaScript에서 제공하는 함수로, 특정 시간이 지난 후에 함수를 실행
function wait(duration){
    return new Promise(resolve => setTimeout(resolve, duration))
}

export default App;
