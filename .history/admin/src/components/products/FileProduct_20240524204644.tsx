import React, { useState, useEffect } from "react";
import { Upload } from "antd";
import type { UploadFile, UploadProps, UploadFileStatus } from "antd"; // Import UploadFileStatus
import ImgCrop from "antd-img-crop";
import type { RcFile } from "antd/es/upload/interface";

type FileType = RcFile;

interface FileProductProps {
  initialFileList?: UploadFile[];
  onFileListChange?: (fileList: UploadFile[]) => void; // Ajouter un callback pour informer le parent des changements
}

export const FileProduct: React.FC<FileProductProps> = ({
  initialFileList = [],
  onFileListChange,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>(initialFileList);

  useEffect(() => {
    setFileList(initialFileList);
  }, [initialFileList]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (onFileListChange) {
      onFileListChange(newFileList); // Informer le parent du changement
    }
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <ImgCrop rotationSlider>
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 5 && "+ Upload"}
      </Upload>
    </ImgCrop>
  );
};
