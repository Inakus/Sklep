import { useCookies } from "react-cookie";

export default function Table({
  p,
  count,
  index,
}: {
  p?: { id: string; nazwa: string; cena: number };
  count?: number | undefined;
  index?: number;
}) {
  const [cookies, setCookie] = useCookies(["shopingCart"]);
  const shopingCartCookies =
    (cookies.shopingCart as Array<{
      id: string;
      price: number;
      count: number;
    }>) || [];

  const removeFromCart = (i: number) => {
    const itemIndex = shopingCartCookies.findIndex((item) => item.id === p?.id);
    if (itemIndex !== -1) {
      shopingCartCookies.splice(i, 1);

      setCookie("shopingCart", shopingCartCookies, {
        path: "/",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    }
    window.location.reload();
  };

  return (
    <>
      {p && count && (
        <tr key={p.id}>
          <th>
            <div key={p.id} className="flex flex-col gap-10">
              <h2 className="text-xl font-bold">{p.nazwa}</h2>
              <p className="font-bold">{(p.cena / 100).toFixed(2)} zł</p>
              <p
                onClick={() => removeFromCart(index!)}
                className="link link-error"
              >
                Usuń
              </p>
            </div>
          </th>
          <td>
            <div key={p.id} className="join flex justify-start">
              <p className="font-bold">{count}</p>
            </div>
          </td>
          <td className="font-bold">
            {((p.cena / 100) * (count ?? 1)).toFixed(2)} zł
          </td>
        </tr>
      )}
      {!p && !count && (
        <tr>
          <th></th>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      )}
    </>
  );
}
