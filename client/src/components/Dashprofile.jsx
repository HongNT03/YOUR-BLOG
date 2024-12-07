import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { TextInput, Button } from "flowbite-react";
import { uploadImage } from "/src/utils/cloudinary.js";

const Dashprofile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imgFileUrl, setimgFileUrl] = useState(null);
  const filePickerRef = useRef();

  useEffect(() => {
    if (imageFile) {
      uploadFile();
    }
  }, [imageFile]);

  const uploadFile = async () => {
    try {
      const result = await uploadImage(imageFile);
      console.log("Uploaded Image:", result.secure_url);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setimgFileUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imgFileUrl || currentUser.profilePicture}
            alt="User"
            className="rounded-full w-full h-full border-8 border-[lightgray] object-cover"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="password" />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Dashprofile;
