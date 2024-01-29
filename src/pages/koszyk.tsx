import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Cookies } from "react-cookie";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";

import Layout from "./layout";
import Table from "~/components/table";

export default function Koszyk() {
  const [cookie, setCookie] = useState<
    Array<{ id: string; price: number; count: number }> | []
  >([]);
  const router = useRouter();
  const products = api.produkt.FindProductsByIds.useQuery({
    ids: cookie?.map((c) => c.id),
  });
  const { user } = useUser();

  const [email, setEmail] = useState(
    user?.primaryEmailAddress?.emailAddress ?? "",
  );
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

  const order = api.zamowienia.AddOrder.useMutation();
  const handleClick = () => {
    if (products.data === undefined) {
      return null;
    }
    order.mutate({
      userId: user ? user?.id.toString() : undefined,
      email: user?.primaryEmailAddress?.emailAddress ?? email,
      price: cookie?.reduce((sum, item) => sum + item.price * item.count, 0),
      products: products.data?.map((p, index: number) => {
        return {
          id: p.id.toString(),
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          quantity: cookie[index]?.count!,
        };
      }),
    });
    const shopingCookies = new Cookies();
    shopingCookies.remove("shopingCart", { path: "/" });
    router.push(`/zamowienie/${order.data?.orderId}`).catch(console.error);
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
                  <p>Podaj adres Email</p>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <button
                    onClick={() => handleClick()}
                    className={
                      "btn btn-primary btn-wide" +
                      (products.data?.length === 0 ? " btn-disabled" : "")
                    }
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
