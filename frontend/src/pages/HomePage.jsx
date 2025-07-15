import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='p-4'>
    <div className="card card-border bg-base-100 w-96">
    <div className="card-body">
      <h2 className="card-title">Chat App</h2>
      <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
      <div className="card-actions justify-end">
        <Link to='/chat' className="btn btn-primary">Chat</Link>
      </div>
  </div>
</div>
    </div>
  )
}

export default HomePage