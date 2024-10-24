import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Container,PostCard } from '../components'

function Home() {
    const [posts,setPosts]=useState([])
    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            // console.log("Fetched posts:", posts); // Check if data is fetched
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    if(posts.length === 0){
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold text-5xl text-gray-800' style={{height:"30vh"}}>
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap container mx-auto max-w-7xl px-5 py-5'>
            {/* {console.log(posts)} */}
                {posts.map((post)=>(
                    <div key={post.$id} className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                        <PostCard $id={post.$id} title={post.title} featuredImage={post.featured_image} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default Home