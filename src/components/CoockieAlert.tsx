import { useEffect, useState } from "react";

export default function CoockieAlert() {
  const [coockies, setCoockies] = useState<string | null>();

  useEffect(() => {
    setCoockies(localStorage.getItem("AceptCoockie"));
  }, []);

  if (coockies === "TRUE") {
    return;
  }

  return (
    <div role="alert" className="alert sticky bottom-0 rounded">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="h-6 w-6 shrink-0 stroke-info"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>Strona używa niezbędnych plików Coockie</span>
      <div>
        <button
          onClick={() => {
            localStorage.setItem("AceptCoockie", "TRUE");
            setCoockies(localStorage.getItem("AceptCoockie"));
          }}
          className="btn btn-primary btn-sm"
        >
          Akceptuj
        </button>
      </div>
    </div>
  );
}
