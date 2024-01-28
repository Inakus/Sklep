import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";
import { useCookies } from "react-cookie";

import Layout from "../layout";
import Carousel from "~/components/Carousel";
import Link from "next/link";

export default function Page() {
  const routrer = useRouter();
  const [items, setItems] = useState(1);
  const [cookies, setCookie] = useCookies(["shopingCart"]);

  const id = routrer.query.id;
  const produkt = api.produkt.FindProduct.useQuery({
    id: id as string,
  });

  const slides: string[] = [];

  produkt.data?.zdjecia.forEach((zdjecie) => {
    slides.push(zdjecie.link);
  });
  if (!produkt.data) {
    return <div>Produkt nie istnieje</div>;
  }

  const addItems = () => {
    if (produkt.data) {
      if (items < produkt.data?.ilosc) setItems(items + 1);
    }
  };

  const removeItems = () => {
    if (items > 0) {
      setItems(items - 1);
    }
  };
  const addToCart = () => {
    if (produkt.data) {
      const shopingCartCookies = cookies.shopingCart as Array<{
        id: string;
        price: number;
        count: number;
      }>;
      if (!shopingCartCookies) {
        setCookie(
          "shopingCart",
          [
            {
              id: produkt.data?.id,
              price: produkt.data?.cena,
              count: items,
            },
          ],
          {
            path: "/",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        );
      } else {
        const existingProductIndex = shopingCartCookies.findIndex(
          (item) => item.id === produkt.data?.id,
        );

        if (existingProductIndex !== -1) {
          // Product already in the cart, update count
          shopingCartCookies[existingProductIndex].count += items;
        } else {
          // Product not in the cart, add it with count 1
          shopingCartCookies.push({
            id: produkt.data?.id,
            price: produkt.data?.cena,
            count: 1,
          });
        }

        // Set the updated shopping cart in the cookie
        setCookie("shopingCart", shopingCartCookies, {
          path: "/",
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
      }
    }
  };

  return (
    <Layout>
      <div className="breadcrumbs m-3 flex justify-center text-sm">
        <ul>
          <li>
            <Link href="/">Strona Glowna</Link>
          </li>
          <li>
            <Link href={`/kategoria/${produkt.data?.tagi}`}>
              {produkt.data?.tagi.charAt(0).toUpperCase() +
                produkt.data?.tagi.slice(1)}
            </Link>
          </li>
          <li>{produkt.data?.nazwa}</li>
        </ul>
      </div>
      <div className="divider"></div>
      <div className="m-5 flex min-h-screen justify-center">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body gap-4">
            <div className="flex flex-1 flex-row flex-wrap justify-center gap-2">
              <div className="m-auto w-[95%] sm:w-[60%]">
                <Carousel slides={slides} />
              </div>
              <div className="m-auto flex flex-col items-end gap-1">
                <div className="my-3 flex flex-col text-end">
                  <p className="text-xs">Kod produktu: {produkt.data?.id}</p>
                  <h1 className="text-2xl font-bold">
                    <strong>{produkt.data?.nazwa}</strong>
                  </h1>
                  {produkt.data?.ilosc > 0 && (
                    <p className="text-xs">
                      🟢 W magazynie {produkt.data.ilosc} sztuki
                    </p>
                  )}
                  {produkt.data?.ilosc === 0 && (
                    <p className="text-xs">🔴 Brak w magazynie</p>
                  )}
                  <p>
                    Cena: {(produkt.data?.cena / 100).toFixed(2)}
                    zł
                  </p>
                </div>
                <div className="flex justify-center gap-5">
                  <div className="join flex justify-center">
                    <button onClick={removeItems} className="btn join-item">
                      -
                    </button>
                    <p className="btn join-item">{items}</p>
                    <button onClick={addItems} className="btn join-item">
                      +
                    </button>
                  </div>
                  <button
                    className={
                      "btn btn-primary" +
                      (produkt.data?.ilosc === 0 ? " btn-disabled" : "")
                    }
                    onClick={addToCart}
                  >
                    Kup Teraz
                  </button>
                </div>
              </div>
            </div>
            <div className="m-5 flex-1">
              <div
                dangerouslySetInnerHTML={{ __html: produkt.data?.opis }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
