import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className='h-screen flex items-center justify-center bg-base-200 p-4'>
      <div className='max-w-2xl w-full border border-base-100 rounded-xl bg-base-300 flex items-center'>
        {/* image */}
        <div className="hidden md:table max-w-sm w-1/2 overflow-hidden"><img src='./login.png' className='w-full h-full object-cover'/></div>
        {/* text */}
        <div className='md:w-1/2 w-full p-4 flex items-center'>
        <div className='w-full '>
        <h1 className='font-bold text-center text-2xl pb-4 text-primary'>LogIn Here</h1>
        <input type="email" placeholder="Email" className="input input-bordered w-full mb-4" />
        <input type="password" placeholder="Password" className="input input-bordered w-full mb-4" />
        <button className='btn btn-primary w-full'>Log In</button>
        <p className='text-xs text-center p-4'>If you don't have Account? <Link to="/signup" className="text-primary hover:underline font-semibold">SignUp</Link></p>
        </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage