import { useState } from "react";
import Layout from "./layout";

export default function Koszyk() {
  const [items, setItems] = useState(0);

  const addItems = () => {
    setItems(items + 1);
  };

  const removeItems = () => {
    if (items > 0) {
      setItems(items - 1);
    }
  };

  return (
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
                <tr>
                  <th>
                    <div className="flex flex-col gap-10">
                      <h2 className="text-xl font-bold">Nazwa przedmiotu</h2>
                      <p className="font-bold">10,90 zł</p>
                      <div className="flex gap-1">
                        <p className="font-bold">Szerokoś Firany [cm]:</p>
                        <p>60</p>
                      </div>
                      <p className="link link-error">Usuń</p>
                    </div>
                  </th>
                  <td>
                    <div className="join flex justify-center">
                      <button onClick={removeItems} className="btn join-item">
                        -
                      </button>
                      <p className="btn btn-disabled join-item">{items}</p>
                      <button onClick={addItems} className="btn join-item">
                        +
                      </button>
                    </div>
                  </td>
                  <td className="font-bold">1000 zł</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card min-h-72 w-[70%] bg-base-100 shadow-xl lg:w-80">
            <div className="card-body flex items-center justify-center text-center">
              <h2 className="card-title">Suma Zamówiena</h2>
              <div className="flex justify-between gap-10">
                <p>Produkty:</p>
                <p>1000 zł</p>
              </div>
              <div className="card-actions justify-center">
                <button className="btn btn-primary btn-wide">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
        <div className="m-10 flex flex-1 flex-col ">
          <h3 className="text-xl font-bold">
            Informacja dla konsumenta o prawie odstąpienia od umowy zawartej na
            odległość
          </h3>
          <br />
          <br />
          <p>
            Konsumentom przysługuje 14 dniowe prawo do odstąpienie od umowy.
            Prawo to przysługuje również osobom fizycznym zawierającym umowę
            bezpośrednio związaną z ich działalnością gospodarczą, gdy z treści
            tej umowy wynika, że nie posiada ona dla tych osób charakteru
            zawodowego w rozumieniu art. 556 (4) Kodeksu cywilnego. Pozostałym
            przedsiębiorcom prawo do odstąpienia od umowy nie przysługuje.
          </p>
        </div>
      </div>
    </Layout>
  );
}
