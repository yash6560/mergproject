import { Link } from 'react-router-dom';

const SignupPage = () => {
  return (
    <div className='h-screen flex items-center justify-center bg-base-200 p-4'>
      <div className='max-w-2xl w-full border border-base-100 rounded-xl bg-base-300 flex items-center'>
        {/* image */}
        <div className="hidden md:table max-w-sm w-1/2 overflow-hidden"><img src='./login.png' className='w-full h-full object-cover'/></div>
        {/* text */}
        <div className='md:w-1/2 w-full p-4 flex items-center'>
        <div className='w-full '>
        <h1 className='font-bold text-center text-2xl pb-4 text-primary'>SignUp Here</h1>
        <input type="text" placeholder="Full Name" className="input input-bordered w-full mb-4" />
        <input type="email" placeholder="Email" className="input input-bordered w-full mb-4" />
        <input type="password" placeholder="Password" className="input input-bordered w-full mb-4" />
        <div className='w-full flex items-center gap-2 pb-4'><input type="radio" name="role" value="user" className="radio radio-primary w-4 h-4" /> <span className='text-xs'>Please accept our Term and Conditions</span>
        </div>
        <button className='btn btn-primary w-full'>Sign Up</button>
        <p className='text-xs text-center p-4'>If you Already have Account? <Link to="/login" className="text-primary hover:underline font-semibold">Login</Link></p>
        </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage