import { create } from 'zustand';
import { axiosInstance } from '../utils/axios';

export const useChatStore = create((set) => ({
    userList : [],
    selectedUser: null,

    setSelectedUser : (user) => {
        set({ selectedUser : user });
    },

    getUsers : async () => {
        try {
            const res = await axiosInstance.post('chat/');
            console.log(res.data);
            set({userList : res.data})
            return res.data;

        } catch (error) {
            console.log(`error in get users : `, error);
        }
    },

    sendMessage : async (formData) => {
        try {

            const res = await axiosInstance.post('chat/send', formData, {
                headers : {
                    "Content-Type": 'multipart/form-data',
                }
            });
            return res.data;
        } catch (error) {
            console.log(`error in send message : `, error);
        }
    },

    getMessage : async (reciverId) => {
        try {
            const res = await axiosInstance.post('chat/get-chat', { reciverId });
            // console.log(res.data);
            return res.data;
        } catch (error) {
            console.log(`error in get message : `, error);
        }
    }
}));