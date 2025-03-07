"use client";

import { useUser } from '@clerk/nextjs';
import { useEffect, useRef, useState } from 'react';
import { HiOutlinePhotograph } from 'react-icons/hi';
import {app} from "../firbase.js"
import {getDownloadURL, getStorage, uploadBytesResumable, ref} from "firebase/storage"




export default function Input() {

  const {user, isLoaded, isSignedIn} = useUser();
  const imagePickerRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);




  const addImageToPost = (e) => {

    const image = e.target.files[0];

    if(image) {
      setImage(image);
      setImageUrl(URL.createObjectURL(image));
    }

  }

 useEffect(() => {
  if(image){
    uploadImageToStorage();
  }
 }, [image]);


 const uploadImageToStorage = async() => {

  setImageLoading(true);
  const storage = getStorage(app);
  const fileName = new Date().getTime() + "-" + image.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, image);

  uploadTask.on("state_change", 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("upload is " + progress + "% done");
    },
    (error) => {
      console.log(error);
      setImageLoading(fasle);
      setImage(null);
      setImageUrl(null);
    },
    () => {
      // now we can get the url
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImageUrl(downloadURL);
        setImageLoading(false);
      });
    },

  );
 }


  return (
    <div className='flex border-b border-gray-200 p-3 space-x-3 w-full'>
      <img
        src={user.imageUrl}
        alt=''
        className='h-11 w-11 rounded-full cursor-pointer hover:brightness-95 object-cover'
      />

      <div className='w-full divide-y divide-gray-200'>
        <textarea
          className='w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700'
          placeholder="What's happening"
          rows='2'
        />

        {image && (
          <img
          src={imageUrl}
          alt='selectedImage'
          className={`w-full max-h-[250px] object-cover cursor-pointer ${imageLoading ? 'animate-pulse' : ''}`}
          onClick={() => {
            setImage(null);
            setImageUrl(null);
          }}
        />
        )}
       
          
        
        <div className='flex items-center justify-between pt-2.5'>
          <HiOutlinePhotograph
            className='h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer'
            onClick={() => imagePickerRef.current.click()}
          />

          <input type="file" hidden accept='image/*' ref={imagePickerRef} onChange={addImageToPost} />

          
          
          <button
            className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
