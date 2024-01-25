import React, { useState, type ChangeEvent } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Layout from "./layout";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export default function Page() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  const handleUpload = async (): Promise<void> => {
    if (!selectedFiles) {
      return;
    }

    const formData = new FormData();
    formData.forEach((value) => {
      formData.append("images", value);
    });

    try {
      const response = await fetch("http://localhost:8080/fileupload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        setImageUrls(data.imageUrls);
      } else {
        console.error("Failed to upload images");
      }
    } catch (error) {
      console.error("Error during image upload:", error);
    }
  };

  return (
    <Layout>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1>Admin panel</h1>
        <p>Witamy w panelu administracyjnym</p>
        <input
          type="file"
          accept="image/*"
          className="file-input w-full max-w-xs"
          multiple
          onChange={handleFileChange}
        />
        <button
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
          onClick={handleUpload}
        >
          Upload Images
        </button>

        <p>Nazwa Przedmiotu</p>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        <p>Kategoria</p>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        <p>Cena</p>
        <input
          type="number"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        <p>Ilosc</p>
        <input
          type="number"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        <p>Opis</p>
        <QuillEditor
          modules={quillModules}
          formats={quillFormats}
          theme="snow"
          className=""
        />
      </div>
    </Layout>
  );
}
