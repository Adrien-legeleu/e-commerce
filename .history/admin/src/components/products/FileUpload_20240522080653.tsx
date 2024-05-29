import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

interface FileUploadProps {
  onUploadSuccess: (urls: string[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const formData = new FormData();
      acceptedFiles.forEach((file: any) => {
        formData.append("files", file);
      });

      axios
        .post("http://localhost:5080/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const urls = response.data.map((file: any) => file.url);
          onUploadSuccess(urls);
        })
        .catch((error) => {
          console.error("Error uploading files:", error);
        });
    },
    [onUploadSuccess]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
};

export default FileUpload;
