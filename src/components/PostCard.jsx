import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from "react-router-dom"


function PostCard({$id, title,featuredImage}) {

  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full br-gray-100 rounded-xl p-4'>
            <div className='post-card bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:transform hover:translate-y-[-5px]'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='w-full h-48 object-cover' />
                <h2 className='text-2xl my-4 mx-5'>
                    {title}
                </h2>
            </div>
        </div>
    </Link>
  )
}

export default PostCard