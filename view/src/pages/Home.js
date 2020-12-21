import { useContext, useEffect, useState } from "react"

import { Context } from '../context/token'

function Home() {
    const { API, token } = useContext(Context)
    const [posts, savePosts] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${API}/post`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
            })
            const data = await response.json()

            savePosts(data)
        }

        if (posts.length === 0)
            fetchData()
        console.log(posts)
    }, [posts])

    return (
        posts.map(post => (
            <div key={post['_id']}>
                <p>{post.post}</p>
            </div>
        ))
    )
}


export default Home