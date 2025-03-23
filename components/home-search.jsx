"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Camera, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const HomeSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isImageSearchActive, setIsImageSearchActive] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [searchImage, setSearchImage] = useState(null);
  const router = useRouter();
  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) {
      toast.error("Please enter a search term");
      return;
    }
    router.push(`/cars?search=${encodeURIComponent(searchTerm)}`);
  };
  const handleImageSearch = (e) => {
    e.preventDefault();
    if (!searchImage) {
      toast.error("Please upload an image");
      return;
    }
  };
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
    }
    setIsUploading(true);
    setSearchImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setIsUploading(false);
      toast.success("Image uploaded successfully");
    };

    reader.onerror = () => {
      setIsUploading(false);
      toast.error("Failed to upload image");
    };
    reader.readAsDataURL(file);
  };
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: { "image/*": [".jpeg", ".jpg", ".png"] },
      maxFiles: 1,
    });
  return (
    <div>
      <form onSubmit={handleTextSubmit}>
        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder="Enter or use our AI Image search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-12 py-6 w-full rounded-full border-gray-300 bg-white/95 backdrop-blur-sm"
          />
          <div className="absolute right-[100px]">
            <Camera
              size={35}
              onClick={() => setIsImageSearchActive(!isImageSearchActive)}
              className="cursor-pointer rounded-xl p-1.5"
              style={{
                color: isImageSearchActive ? "white" : "",
                background: isImageSearchActive ? "black" : "",
              }}
            />
          </div>
          <Button className="absolute right-2 rounded-full">Search</Button>
        </div>
      </form>

      {isImageSearchActive && (
        <div className="mt-4">
          <form onSubmit={handleImageSearch}>
            <div className="border-2 border-dashed border-gray-300 rounded-3xl p-6 text-center">
              {imagePreview ? (
                <div className="flex flex-col items-center">
                  <img
                    src={imagePreview}
                    alt="car preview"
                    className="h-40 object-contain mb-4"
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      setImagePreview("");
                      setSearchImage(null);
                      toast.info("Image removed successfully");
                    }}
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <div {...getRootProps()} className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <input {...getInputProps()} />
                    <Upload className="h-12 w-12 text-gray-400 mb-2" />
                    {isDragActive && !isDragReject ? (
                      <p className="text-gray-400 mb-2">Leave the files here</p>
                    ) : (
                      <p className="text-gray-400 mb-2">
                        Drag 'n' drop car image, or click to select files
                      </p>
                    )}
                    {isDragReject && (
                      <p className="text-red-500 mb-2">
                        Only images are allowed
                      </p>
                    )}
                    <p className="text-gray-400 text-sm">
                      Supports only JPG,PNG (MAX - 5MB)
                    </p>
                  </div>
                </div>
              )}
            </div>
            {imagePreview && (
              <Button
                type="submit"
                className="w-full mt-2"
                disabled={isUploading}
              >
                {isUploading ? "Uploading" : "Search with image"}
              </Button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default HomeSearch;
