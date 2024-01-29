import Image from "next/image";
import { useRouter } from "next/router";

interface Produkt {
  id: string;
  name: string;
  price: number;
  imageUrls: string | undefined;
}

export default function Card({ id, name, price, imageUrls }: Produkt) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/produkt/${id}`)}
      className="card w-[82%] bg-base-100 shadow-xl hover:cursor-pointer hover:bg-base-200 md:w-96"
    >
      <figure>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */}
        <Image src={imageUrls!} alt={name} width={500} height={500} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="card-actions justify-end">
          <p>Cena: {(price / 100).toFixed(2)}zł</p>
        </div>
      </div>
    </div>
  );
}
