import { create } from 'zustand';
import { axiosInstance } from '../utils/axios';

export const useFileUpload = create((set) => ({
    isFileSelected : true,

    uploadFile : async (formData) => {
        console.log(formData)

        try {
            const res = await axiosInstance.post('file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
                return res.data; 
        } catch (error) {
            console.log("Error in file upload : ", error);
        }
    }
}))