import Head from "next/head";
import Link from "next/link";
import Layout from "./layout";
import Card from "~/components/Card";
import Carousel from "~/components/Carousel";
import Hero from "~/components/Hero";

export default function Home() {
  const slides = [
    "https://i.pinimg.com/originals/51/82/ac/5182ac536727d576c78a9320ac62de30.jpg",
    "https://wallpapercave.com/wp/wp3386769.jpg",
    "https://wallpaperaccess.com/full/809523.jpg",
    "https://getwallpapers.com/wallpaper/full/5/c/0/606489.jpg",
  ];

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className="flex flex-col">
          <div className="flex min-h-screen flex-col items-center justify-center">
            <ul className="menu menu-horizontal w-[90%] justify-center rounded-box bg-base-200">
              <li>
                <Link href="/kategoria/tag1">Item 1</Link>
              </li>
              <li>
                <Link href="/kategoria/tag2">Item 2</Link>
              </li>
              <li>
                <Link href="/kategoria/tag3">Item 3</Link>
              </li>
            </ul>
            <div className="flex justify-center p-5 align-middle">
              <div className="m-auto w-[60%]">
                <Carousel slides={slides} />
              </div>
            </div>
            <div className=" flex w-[100%] flex-row flex-wrap items-center justify-center gap-20 ">
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
            <div className="m-5 flex items-center justify-center align-middle">
              <Hero />
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
