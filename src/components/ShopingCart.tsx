import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function ShoppingCart() {
  const [cookies] = useCookies<string>(["shopingCart"]);
  const [items, setItems] = useState<
    [{ id: number; price: number; count: number }] | []
  >([]);

  useEffect(() => {
    if (cookies.shopingCart) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setItems(cookies.shopingCart);
    }
  }, [cookies.shopingCart]);

  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const total = items.reduce(
    (acc: number, item: { id: number; price: number; count: number }) =>
      acc + (item.price / 100) * item.count,
    0,
  );

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="badge indicator-item badge-sm">{items.length}</span>
        </div>
      </div>
      <div
        tabIndex={0}
        className="card dropdown-content card-compact z-[1] mt-3 w-52 bg-base-100 shadow"
      >
        <div className="card-body">
          <span className="text-lg font-bold">
            {items.length} Przedmioty w Koszyku
          </span>
          <span className="text-info">Do zapłaty: {total.toFixed(2)}zł</span>
          <div className="card-actions">
            <button
              onClick={() => router.push("/koszyk")}
              className="btn btn-primary btn-block"
            >
              Zobacz koszyk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
