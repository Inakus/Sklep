import Link from "next/link";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

import CountrySelector from "~/components/CountrySelector";

export default function Page() {
  const [delivery, setDelivery] = useState("PACZKOMAT");

  const { user } = useUser();

  const deliveryMethod = () => {
    if (delivery === "PACZKOMAT") {
      return "Paczkomat 24/7";
    } else if (delivery === "PRZEDPŁATA") {
      return "Przedpłata";
    } else if (delivery === "POBRANIE") {
      return "Pobranie";
    }
  };

  const deliveryCost = () => {
    if (delivery === "PACZKOMAT") {
      return "14,90";
    } else if (delivery === "PRZEDPŁATA") {
      return "9,99";
    } else if (delivery === "POBRANIE") {
      return "19,90";
    }
  };

  return (
    <div className="my-5 flex min-h-screen w-full flex-col flex-wrap items-center justify-center gap-8 md:flex-row md:items-start">
      <div className="flex flex-1 flex-col flex-wrap items-center justify-center gap-5 md:w-[50%]">
        <div className="card flex w-[80%] bg-base-100  shadow-xl">
          <div className="card-body items-start text-center">
            <h2 className="card-title">1. Informację kontaktowe</h2>
            {!user && (
              <p>
                Posiadasz już konto?{" "}
                <Link className="link link-primary" href={"/signup"}>
                  Zaloguj się
                </Link>
              </p>
            )}
            <br />
            <p>
              Adres e-mail <strong className="text-error">*</strong>
            </p>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
            />
            <br />
            <h2 className="card-title">2. Adres dostawy</h2>
            <p>
              Imię <strong className="text-error">*</strong>
            </p>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
            />
            <p>
              Nazwisko <strong className="text-error">*</strong>
            </p>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
            />
            <p>Firma</p>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
            />
            <p>
              Ulica i numer domu <strong className="text-error">*</strong>
            </p>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
            />
            <p>
              Kraj <strong className="text-error">*</strong>
            </p>
            <CountrySelector />
            <p>Województwo</p>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
            />
            <p>
              Miasto <strong className="text-error">*</strong>
            </p>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
            />
            <p>
              Kod pocztowy <strong className="text-error">*</strong>
            </p>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
            />
            <p>
              Numer telefonu<strong className="text-error">*</strong>
            </p>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
            />
            <p>Numer NIP (VAT UE)</p>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        <div className="card w-[80%] bg-base-100 shadow-xl">
          <div className="card-body items-start ">
            <h2 className="card-title">3. Sposób wysyłki</h2>
            <div className="form-control">
              <label className="label cursor-pointer gap-3">
                <input
                  onClick={() => setDelivery("PACZKOMAT")}
                  name="wysylka"
                  type="radio"
                  className="radio"
                />
                <span className="label-text">14,90 zł Paczkomat 24/7</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer gap-3">
                <input
                  onClick={() => setDelivery("PRZEDPŁATA")}
                  name="wysylka"
                  type="radio"
                  className="radio"
                />
                <span className="label-text">9,99 zł Przedpłata</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer gap-3">
                <input
                  onClick={() => setDelivery("POBRANIE")}
                  name="wysylka"
                  type="radio"
                  className="radio"
                />
                <span className="label-text">19,90 zł Pobranie</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 justify-center md:w-[50%]">
        <div className="card w-[80%] bg-base-100 shadow-xl">
          <div className="card-body items-start text-start">
            <h2 className="card-title">4. Podsumowanie zamówienia</h2>
            <div className="flex flex-col gap-10">
              <h2 className="text-xl font-bold">Nazwa przedmiotu</h2>
              <p className="font-bold">10,90 zł</p>
            </div>
            <div className="divider"></div>
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-12">
                <h2 className="text-xl font-bold">Suma zamówienia(z VAT)</h2>
                <span className="font-bold">10,90 zł</span>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-lg">Produkt</h2>
                <span className="font-bold">10,90 zł</span>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-lg">Wysyłka {deliveryMethod()}</h2>
                <span className="font-bold">{deliveryCost()} zł</span>
              </div>
              <br></br>
              <div className="flex flex-col items-start">
                <h2 className="text-lg">Komentarz do zamówienia</h2>
                <textarea className="textarea textarea-bordered textarea-lg w-full max-w-xs"></textarea>
              </div>
            </div>
            <button className="btn btn-primary btn-block mt-4">
              Zamawiam i płacę
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
