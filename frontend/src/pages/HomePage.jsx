import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='p-4 flex flex-wrap gap-3 '>
    <div className="card card-border bg-base-100 w-96">
    <div className="card-body">
      <h2 className="card-title">💬 Chat App</h2>
      <p>Stay connected in real time! This interactive chat app lets you send and receive messages instantly. Built for seamless communication with a modern UI.</p>
      <div className="card-actions justify-end">
        <Link to='/chat' className="btn btn-primary">→ Ready to start chatting?</Link>
      </div>
  </div>
</div>
    <div className="card card-border bg-base-100 w-96">
    <div className="card-body">
      <h2 className="card-title">📁 File Uploading</h2>
      <p>Effortlessly upload and manage your files in a clean and intuitive interface. Fast, secure, and perfect for sharing or storing your data.</p>
      <div className="card-actions justify-end">
        <Link to='/file-upload' className="btn btn-primary">→ Need to upload something?</Link>
      </div>
  </div>
</div>
    </div>
  )
}

export default HomePage