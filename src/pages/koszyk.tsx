import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Cookies } from "react-cookie";
import { api } from "~/utils/api";

import Layout from "./layout";
import Table from "~/components/table";

export default function Koszyk() {
  const [cookie, setCookie] = useState<
    Array<{ id: string; price: number; count: number }> | []
  >([]);
  const router = useRouter();
  const orderId = 1234567890;

  useEffect(() => {
    const shopingCookies = new Cookies();
    setCookie(
      shopingCookies.get("shopingCart") as Array<{
        id: string;
        price: number;
        count: number;
      }>,
    );
  }, []);

  const products = api.produkt.FindProductsByIds.useQuery({
    ids: cookie?.map((c) => c.id),
  });

  const handleClick = () => {
    router.push(`/zamowienie/${orderId}`).catch(console.error);
  };

  return (
    <>
      <Layout>
        <div className="flex min-h-[73vh] flex-col items-center justify-center gap-5">
          <div className="flex w-full flex-1 flex-wrap items-start justify-center gap-5">
            <div className="w-[70%] overflow-x-auto lg:w-[60%]">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Przedmiot</th>
                    <th>Ilość</th>
                    <th>Suma</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {cookie == undefined && <Table></Table>}
                  {products.data?.map((p, index) => {
                    return (
                      <Table
                        key={index}
                        p={p}
                        count={cookie[index]?.count}
                        index={index}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="card min-h-72 w-[70%] bg-base-100 shadow-xl lg:w-80">
              <div className="card-body flex items-center justify-center text-center">
                <h2 className="card-title">Suma Zamówiena</h2>
                <div className="flex justify-between gap-10">
                  <p>Produkty:</p>
                  <p>
                    {!cookie
                      ? "0,00"
                      : cookie
                          .reduce(
                            (
                              acc: number,
                              item: {
                                id: string;
                                price: number;
                                count: number;
                              },
                            ) => acc + (item.price / 100) * item.count,
                            0,
                          )
                          .toFixed(2)}{" "}
                    zł
                  </p>
                </div>
                <div className="card-actions justify-center">
                  <button
                    onClick={() => handleClick()}
                    className="btn btn-primary btn-wide"
                  >
                    Kup Teraz
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="m-10 flex flex-1 flex-col ">
            <h3 className="text-xl font-bold">
              Informacja dla konsumenta o prawie odstąpienia od umowy zawartej
              na odległość
            </h3>
            <br />
            <br />
            <p>
              Konsumentom przysługuje 14 dniowe prawo do odstąpienie od umowy.
              Prawo to przysługuje również osobom fizycznym zawierającym umowę
              bezpośrednio związaną z ich działalnością gospodarczą, gdy z
              treści tej umowy wynika, że nie posiada ona dla tych osób
              charakteru zawodowego w rozumieniu art. 556 (4) Kodeksu cywilnego.
              Pozostałym przedsiębiorcom prawo do odstąpienia od umowy nie
              przysługuje.
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}
