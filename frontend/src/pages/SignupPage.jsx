import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const {signUp, isLoading} = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await signUp(formData);
    if (res?.success){
      toast.success("Signup successfully.");
      navigate('/login');
    }
    else {
      toast.error(res?.message);
    }
  }

  
  return (
    <div className='h-screen flex items-center justify-center bg-base-200 p-4'>
      <div className='max-w-2xl w-full border border-base-100 rounded-xl bg-base-300 flex items-center'>
        {/* image */}
        <div className="hidden md:table max-w-sm w-1/2 overflow-hidden"><img src='./login.png' className='w-full h-full object-cover'/></div>
        {/* text */}
        <div className='md:w-1/2 w-full p-4 flex items-center'>
        <form className='w-full' onSubmit={handleSubmit}>
        <h1 className='font-bold text-center text-2xl pb-4 text-primary'>SignUp Here</h1>
        <input type="text" placeholder="Full Name" className="input input-bordered w-full mb-4" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}/>
        <input type="email" placeholder="Email" className="input input-bordered w-full mb-4" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
        <input type="password" placeholder="Password" className="input input-bordered w-full mb-4" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
        <div className='w-full flex items-center gap-2 pb-4'><input type="radio" name="role" value="user" className="radio radio-primary w-4 h-4" /> <span className='text-xs'>Please accept our Term and Conditions</span>
        </div>
        <button type='submit' className='btn btn-primary w-full'>{isLoading ? "Signing..." : "Sign Up"}</button>
        <p className='text-xs text-center p-4'>If you Already have Account? <Link to="/login" className="text-primary hover:underline font-semibold">Login</Link></p>
        </form>
        </div>
      </div>
    </div>
  )
}

export default SignupPage