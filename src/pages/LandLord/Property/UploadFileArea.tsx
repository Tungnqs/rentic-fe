import React, { useEffect, useRef, useState } from "react";
import {
  ImageIcon,
  TrashIcon,
  UploadFileIcon,
} from "../../../assets/icon/icon";

interface IUploadFileAreaProps{
    setFilesForUploading:(value: File[])=>void
}

const UploadFileArea = ({setFilesForUploading}: IUploadFileAreaProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newFiles = e.dataTransfer.files;
    setFiles((prevFiles) => [...prevFiles, ...Array.from(newFiles)]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = e.target.files;
      setFiles((prevFiles) => [...prevFiles, ...Array.from(newFiles)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFile) => {
      const updateFiles = [...prevFile];
      updateFiles.splice(index, 1);
      return updateFiles;
    });
  };

  useEffect(()=>{
    setFilesForUploading(files);
  }, [files, setFilesForUploading])

  return (
    <div className="flex flex-col justify-center w-full gap-4">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        <div className="flex flex-col items-center justify-center py-3">
          <UploadFileIcon />
          <p className="mb-2 text-sm text-gray-500 ">
            <span className="font-semibold">Click to upload images</span> or
            drag and drop
          </p>
        </div>
        <input
          type="file"
          multiple
          hidden
          onChange={handleFileChange}
          ref={inputRef}
        />
      </div>
      <div className="flex items-center flex-col gap-1">
        {files &&
          files.map((value, index) => (
            <div key={index} className="w-[50%] flex gap-2 border border-gray-500 border-dashed rounded-md p-1">
              <div className="w-6 text-gray-500">
                <ImageIcon className="w-full" />
              </div>
              <div className="flex-1 truncate hover:underline">{value.name}</div>
              <div className="w-6 text-red-600 cursor-pointer hover:text-red-800" onClick={()=>handleRemoveFile(index)}>
                <TrashIcon className="w-full" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UploadFileArea;
