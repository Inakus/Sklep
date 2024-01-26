import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Layout from "../layout";
import Card from "~/components/Card";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const tag = api.produkt.FindAllProductsWithCategory.useQuery({
    category: router.query.tag as string,
  });
  return (
    <Layout>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button btn-block lg:hidden "
          >
            Filtry
          </label>
          <div className="flex min-h-screen flex-col justify-between lg:flex-row">
            <div className="m-3 flex flex-row flex-wrap justify-center gap-6">
              {tag.data?.map((produkt) => (
                <Card
                  key={produkt.id}
                  id={produkt.id}
                  name={produkt.nazwa}
                  price={produkt.cena}
                  description={produkt.opis}
                  imageUrls={produkt.zdjecia[0]?.link}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="drawer-side z-50 lg:z-10">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay "
          ></label>
          <ul className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a>Filtry</a>
              <ul>
                <li>
                  <Link
                    className={router.query.tag === "firany" ? "active" : ""}
                    href="/kategoria/firany"
                  >
                    Firany
                  </Link>
                </li>
                <li>
                  <Link
                    className={router.query.tag === "zaslony" ? "active" : ""}
                    href="/kategoria/zaslony"
                  >
                    Zasłony
                  </Link>
                </li>
                <li>
                  <Link
                    className={router.query.tag === "dywany" ? "active" : ""}
                    href="/kategoria/dywany"
                  >
                    Dywany
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
