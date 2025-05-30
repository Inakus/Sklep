import { useUser } from "@clerk/nextjs";
import Layout from "./layout";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useEffect } from "react";

export default function Profil() {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/").catch(console.error);
    }
  });

  const deleteUser = api.user.deleteUser.useMutation();
  const handleDeleteUser = () => {
    const userId = user?.id;
    if (!userId) {
      return;
    }
    deleteUser.mutate({ userId });
    router.push("/").catch(console.error);
    window.location.reload();
  };

  const orders = api.zamowienia.FindAllOrdersByUser.useQuery({
    userId: user?.id,
  });

  return (
    <Layout>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center gap-5">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden "
          >
            Ustawienia
          </label>
          <h1>Witaj {user?.primaryEmailAddress?.emailAddress}</h1>
          <div className="flex w-full flex-col overflow-x-auto text-center">
            <h2 className="text-2xl font-bold">Zamównia</h2>
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Nr. zamówiania</th>
                  <th>Data złoania</th>
                  <th>Status</th>
                  <th>Wartoś</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {orders.isFetched &&
                  orders.data?.map((order) => {
                    return (
                      <tr className="hover" key={order.id}>
                        <th>{order.id}</th>
                        <td>{order.createdAt.toLocaleString()}</td>
                        <td>{order.status}</td>
                        <td>{(order.cena / 100).toFixed(2)} zł</td>
                      </tr>
                    );
                  })}
                {orders.data?.length === 0 && (
                  <tr className="hover">
                    <th></th>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex min-h-screen flex-col justify-between lg:flex-row">
            <div className="m-3 flex flex-row flex-wrap justify-center gap-6"></div>
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
            <ul className="menu w-56 bg-base-200 p-0 [&_li>*]:rounded-none">
              <li>
                <a
                  className="font-bold text-error"
                  onClick={() =>
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
                    (
                      document.getElementById("my_modal_1") as HTMLDialogElement
                    )?.showModal()
                  }
                >
                  Usuń Konto
                </a>
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box absolute bottom-0 left-0 right-0 top-0 m-auto">
                    <h3 className="text-lg font-bold">Uwaga!</h3>
                    <p className="py-4">
                      Czy na pewno chcesz usunąć swoje konto?
                    </p>
                    <div className="modal-action flex items-center justify-center">
                      <button
                        className="btn btn-neutral m-4"
                        onClick={() => {
                          handleDeleteUser();
                        }}
                      >
                        Akceptuj
                      </button>
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-primary m-4">Anuluj</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
