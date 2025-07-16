import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { useFileUpload } from '../store/useFileUpload';
import toast from 'react-hot-toast';

const FileUpload = () => {

  const fileInputRef = useRef();
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const {uploadFile} = useFileUpload();
  const [fileUrl, setFileUrl] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  }

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if(e.dataTransfer.files && e.dataTransfer.files[0]){
        handleFile(e.dataTransfer.files[0]);
    }
  }

  const handleFile = async(file) => {
    if(file.size > 5 * 1024 * 1024){
        alert("File size exceeds 5MB limit.");
        return;
    }
    setFileName(file.name);
    setSelectedFile(file);
    console.log("Selected file:", file);
  }

  const handleUpload = async() => {
    if(!selectedFile) return
    const formData = new FormData();
    formData.append('file', selectedFile);
    
    //logic for upload
    try {
      const response = await uploadFile(formData);
      if(response.success) {
        toast.success("file uploded successfully");
      }
      setFileUrl(response.fileUrl);
      setSelectedFile(null);
      setFileName(null);
      
      console.log(response);
    } catch (error) {
      console.error(err);
      alert("Upload failed.");
    }
  }

  const handleFileChange = (e) => {
    if(e.target.files && e.target.files[0]){
      const files = e.target.files[0];
        handleFile(files);
    }
  }

const handleClick = () => {
    fileInputRef.current.click();
}

  return (
    <div className='flex-1 items-center justify-center md:p-8 p-4 max-w-screen-md h-full m-auto'>
        <div className='bg-base-100 w-full p-4 rounded-lg'>
        <p className='font-bold text-xl pb-3'>FileUpload</p>
        <label className={`w-full flex flex-col items-center justify-center p-8 border gap-4 ${
            dragActive ? 'border-blue-400 bg-base-200' : 'border-base-300'}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={handleClick}>
            <Upload className=' text-gray-500'/>
            <span className='text-center'>Drag & drop a file here or click to upload<br/> <span className='text-sm'>Max File-size 5MB</span></span>
            <input type='file' ref={fileInputRef} hidden onChange={handleFileChange}/>
        </label>
        {
            fileName && (
                <p className='pt-4'><span className='text-blue-400'>{fileName}</span> is selected</p>
            )
        }
        <div className='pt-4'>
        <button className={`btn w-full ${fileName ? 'btn-active' : 'btn-disabled' }`} onClick={handleUpload}>Upload File and get LinkUrl</button>
        {fileUrl && <div className='pt-4'><span className='font-bold text-lg'>Uploded File Url :</span> <span className=' cursor-pointer text-blue-500 break-all'><a href={fileUrl} target='_blank'>{fileUrl}</a></span></div>}
        
        </div>
        </div>
    </div>
  )
}

export default FileUpload