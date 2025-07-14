import { create } from 'zustand';
import { axiosInstance } from '../utils/axios';

export const useAuthStore = create((set) => ({
    isLoading : false,
    authUser : null,
    
    signUp : async (formData) => {
        set({ isLoading : true });
        try{
            const res = await axiosInstance.post('auth/signup', formData);
            return res.data;
        }
        catch(error){
            console.error("Sign up failed:", error);
            if (error.response?.data) {
                return error.response.data;
            }
            return { success: false, message: error.message || "Network error occurred" };
        } finally {
            set({ isLoading : false });
        }
    },

    logIn : async (formData) => {
        set({ isLoading : true})
        try {
            const res = await axiosInstance.post('auth/login', formData);
            console.log(res);
            if(res.data?.success){
                set({ authUser: res.data.user });
            }
            return res.data;
        } catch(error){
            console.error("Login failed:", error);
            if (error.response?.data) {
                return error.response.data;
            }
            return { success: false, message: error.message || "Network error occurred" };
        } finally {
            set({ isLoading : false });
        }
    },

    logOut : async () => {
        try {
           const res = await axiosInstance.post('auth/logout');
           if(res.data?.success) {
            set({ authUser: null })
           }
           return res.data; 
        } catch (error) {
            console.error("Logout failed:", error);
            if (error.response?.data) {
                return error.response.data;
            }
            return { success: false, message: error.message || "Network error occurred" };
        }
    },

    fetchAuthUser : async() =>{
        set({ isLoading : true});
        try {
            const res = await axiosInstance.get('auth/me');
            if(res.data?.success){
                set({ authUser : res.data.user });
            }else {
                set({ authUser: null });
            }
            
        } catch (error) {
            console.log("Auth fetch failed:", error);
            set({ authUser: null });
        } finally {
            set ({ isLoading : false });
        }
    }
}));