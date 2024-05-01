import { ChangeEvent, useRef, useState } from "react";

export const useImageDrag = () => {
  const [imageUrl, setImageUrl] = useState("/");
  const [isDragging, setIsDragging] = useState(false);
  const [imageFile, setImageFile] = useState<File>();
  const fileRef = useRef<HTMLInputElement>();

  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  };
  const onDrop = (e: React.DragEvent) => {
    const file = e.dataTransfer.files?.[0];
    e.preventDefault();
    e.stopPropagation();
    if (!file) {
      alert('파일이 없습니다!');
      return;
    }
    const result = URL.createObjectURL(file);
    setImageFile(file);
    setImageUrl(result);
    setIsDragging(false);
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (!file) {
      alert('파일이 없습니다!');
      return;
    }
    const result = URL.createObjectURL(file);
    setImageUrl(result);
        setImageFile(file);
  };

  const deletePreviewImageHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setImageUrl("/");
    setImageFile(undefined);
  };

  return {
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    onChangeFile,
    imageFile,
    imageUrl,
    fileRef,
    isDragging,
    setImageUrl,
    deletePreviewImageHandler,
  };
};
