import React, { useState, type ChangeEvent } from "react";
import dynamic from "next/dynamic";
import { api } from "~/utils/api";
import "react-quill/dist/quill.snow.css";
import Layout from "./layout";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export default function Page() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("firany");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [id, setId] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [text, setText] = useState("");

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      ["link"],
      [{ color: [] }],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "link",
    "color",
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
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i] as string | Blob);
    }

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

  const createProduct = api.produkt.CreateProduct.useMutation();
  const deleteProduct = api.produkt.DeleteProduct.useMutation();
  const deleteAllProducts = api.produkt.DeleteAllProducts.useMutation();

  const handleCreateProduct = () => {
    if (
      title === "" &&
      description === "" &&
      price === 0 &&
      quantity === 0 &&
      tag === "" &&
      imageUrls.length === 0
    ) {
      setText("Uzupelnij pola");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      return;
    }

    createProduct.mutate({
      name: title,
      description: description,
      quantity: quantity,
      price: price,
      tag: tag,
      imageURls: imageUrls,
    });
    if (createProduct.isSuccess) {
      setText("Produkt utworzony");
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }
    if (createProduct.isError) {
      setText("Produkt nie został utworzony");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  const handleDeleteAllProducts = () => {
    deleteAllProducts.mutate();
    if (deleteAllProducts.isSuccess) {
      setText("Produkt usunięty");
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }
    if (deleteAllProducts.isError) {
      setText("Produkt nie został usunięty");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  const handleDeleteProduct = () => {
    if (id === "") {
      return;
    }
    deleteProduct.mutate({ id: id });
    if (deleteProduct.isSuccess) {
      setText("Produkt usunięty");
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }
    if (deleteProduct.isError) {
      setText("Produkt nie został usunięty");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  return (
    <Layout>
      {isSuccess && (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{text}</span>
        </div>
      )}
      {isError && (
        <div role="alert" className="alert alert-error sticky top-0 z-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{text}</span>
        </div>
      )}
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
          onChange={(e) => setTitle(e.target.value)}
        />
        <p>Kategoria</p>
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => setTag(e.target.value.toLowerCase())}
        >
          <option selected>Firany</option>
          <option>Zasłony</option>
          <option>Dywany</option>
        </select>
        <p>Cena</p>
        <input
          type="number"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setPrice(Number(e.target.value) * 100)}
        />
        <p>Ilosc</p>
        <input
          type="number"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <p>Opis</p>
        <QuillEditor
          modules={quillModules}
          formats={quillFormats}
          theme="snow"
          value={description}
          onChange={setDescription}
        />
        <br></br>
        <button
          onClick={handleCreateProduct}
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
        >
          Dodaj produkt
        </button>
        <br></br>
        <br></br>
        <p>Podaj ID produktu do usunięcia</p>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setId(e.target.value)}
        />
        <br></br>
        <button
          onClick={handleDeleteProduct}
          className="btn btn-error btn-xs sm:btn-sm md:btn-md lg:btn-lg"
        >
          Usun produkt
        </button>
        <br></br>
        <button
          onClick={handleDeleteAllProducts}
          className="btn btn-error btn-xs sm:btn-sm md:btn-md lg:btn-lg"
        >
          Usun wszystkie produkty
        </button>
      </div>
    </Layout>
  );
}
