import React, { useEffect, useState } from "react";
import { Select, TextInput, FileInput, Button, Alert } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadImage } from "/src/utils/cloudinary.js";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdatePost = () => {
  const { postId } = useParams();
  const [imageFile, setImageFile] = useState(null);
  const [imgFileUrl, setimgFileUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const [data, setData] = useState({});

  const { currentUser } = useSelector((state) => state.user);

  console.log(data);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/list-post?postId=${postId}`);
        const dt = await res.json();
        if (!res.ok) {
          console.log(dt.message);
          setPublishError(dt.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setData(dt.posts[0]);
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  }, [postId]);

  const handleUpload = async () => {
    if (!imageFile) {
      setImageUploadError("Please select an image");
      return;
    }
    setIsUploading(true);
    try {
      const result = await uploadImage(imageFile);
      const imgUrlFromCloudinary = result.secure_url;
      setData((prevData) => ({
        ...prevData,
        image: imgUrlFromCloudinary,
      }));
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setimgFileUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/post/update/${data._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const dt = await res.json();
      if (dt.succes === false) {
        setPublishError(dt.message);
        return;
      }
      if (!res.ok) {
        setPublishError(dt.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${dt.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update a Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) => setData({ ...data, title: e.target.value })}
            value={data.title}
          />
          <Select
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUpload}
            disabled={isUploading}
          >
            {isUploading ? "loading" : "Upload"}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {imageFile ? (
          <img
            src={imgFileUrl}
            alt="upload preview"
            className="w-full h-72 object-cover"
          />
        ) : (
          data.image && (
            <img
              src={data.image}
              alt="uploaded"
              className="w-full h-72 object-cover"
            />
          )
        )}
        <ReactQuill
          onChange={(value) => {
            setData((prevData) => ({
              ...prevData,
              content: value,
            }));
          }}
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          value={data.content}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Update
        </Button>
      </form>

      {publishError && (
        <Alert className="mt-3" color="failure">
          {publishError}
        </Alert>
      )}
    </div>
  );
};

export default UpdatePost;
