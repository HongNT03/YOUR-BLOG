import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextInput, Button, Alert } from "flowbite-react";
import { uploadImage } from "/src/utils/cloudinary.js";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice";

const Dashprofile = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imgFileUrl, setimgFileUrl] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const [data, setData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (imageFile) {
      uploadFile();
    }
  }, [imageFile]);

  const uploadFile = async () => {
    setIsUploading(true); // Start uploading
    try {
      const result = await uploadImage(imageFile);
      // data url
      const imgUrlFromCloudinary = result.secure_url;
      setData({ ...data, profilePicture: imgUrlFromCloudinary });
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false); // Upload complete
    }
  };

  const handleSubmit = async (e) => {
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    e.preventDefault();
    if (Object.keys(data).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    if (isUploading) {
      setUpdateUserError("Please wait for the image to finish uploading");
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dt = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(dt.message));
        setUpdateUserError(dt.message);
      } else {
        dispatch(updateSuccess(dt));
        setUpdateUserSuccess("User update successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(dt.message);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
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
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
    </div>
  );
};

export default Dashprofile;
