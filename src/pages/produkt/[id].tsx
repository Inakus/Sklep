import { useRouter } from "next/router";
import Layout from "../layout";
import Carousel from "~/components/Carousel";
import { useState } from "react";

export default function Page() {
  const routrer = useRouter();
  const slides = [
    "https://i.pinimg.com/originals/51/82/ac/5182ac536727d576c78a9320ac62de30.jpg",
    "https://wallpapercave.com/wp/wp3386769.jpg",
    "https://wallpaperaccess.com/full/809523.jpg",
    "https://getwallpapers.com/wallpaper/full/5/c/0/606489.jpg",
  ];
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
      <div className="breadcrumbs m-3 flex justify-center text-sm">
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Documents</a>
          </li>
          <li>Add Document</li>
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
                  <p className="text-xs">Kod produktu: 1231234237</p>
                  <h1 className="text-2xl font-bold">
                    <strong>Nazwa Przedmiotu</strong>
                  </h1>
                  <p className="text-xs">🟢 W magazynie</p>
                </div>
                <div className="flex justify-center gap-5">
                  <div className="join flex justify-center">
                    <button onClick={removeItems} className="btn join-item">
                      -
                    </button>
                    <p className="btn btn-disabled join-item">{items}</p>
                    <button onClick={addItems} className="btn join-item">
                      +
                    </button>
                  </div>
                  <button className="btn btn-primary">Kup Teraz</button>
                </div>
                <div className="collapse collapse-arrow rounded-none bg-base-200">
                  <input type="radio" name="my-accordion-2" />
                  <div className="collapse-title text-xl font-medium">
                    Click to open this one and close others
                  </div>
                  <div className="collapse-content">
                    <p>hello</p>
                  </div>
                </div>
                <div className="collapse collapse-arrow rounded-none bg-base-200">
                  <input type="radio" name="my-accordion-2" />
                  <div className="collapse-title text-xl font-medium">
                    Click to open this one and close others
                  </div>
                  <div className="collapse-content">
                    <p>hello</p>
                  </div>
                </div>
                <div className="collapse collapse-arrow rounded-none bg-base-200">
                  <input type="radio" name="my-accordion-2" />
                  <div className="collapse-title text-xl font-medium">
                    Click to open this one and close others
                  </div>
                  <div className="collapse-content">
                    <p>hello</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="m-5 flex-1">
              <p>
                ILorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Mattis nunc sed blandit libero volutpat sed cras ornare. A diam
                maecenas sed enim ut sem viverra aliquet. Malesuada fames ac
                turpis egestas. Fusce id velit ut tortor pretium viverra
                suspendisse potenti nullam. Sagittis orci a scelerisque purus
                semper eget duis. Iaculis eu non diam phasellus vestibulum lorem
                sed risus ultricies. Volutpat diam ut venenatis tellus in metus
                vulputate eu scelerisque. Venenatis urna cursus eget nunc.
                Tincidunt nunc pulvinar sapien et. Amet consectetur adipiscing
                elit ut aliquam purus sit. Imperdiet massa tincidunt nunc
                pulvinar sapien et. Elit eget gravida cum sociis natoque
                penatibus et magnis dis. Diam quis enim lobortis scelerisque
                fermentum dui faucibus in ornare. Cursus sit amet dictum sit
                amet justo donec. Convallis aenean et tortor at risus. Diam
                maecenas sed enim ut sem. Viverra tellus in hac habitasse. Sit
                amet commodo nulla facilisi nullam vehicula. Platea dictumst
                vestibulum rhoncus est pellentesque elit ullamcorper dignissim
                cras. Ornare aenean euismod elementum nisi quis eleifend quam
                adipiscing. Purus sit amet luctus venenatis lectus magna
                fringilla urna. Commodo quis imperdiet massa tincidunt nunc.
                Metus vulputate eu scelerisque felis imperdiet proin. Ut aliquam
                purus sit amet luctus. Nibh ipsum consequat nisl vel pretium
                lectus. Sed risus ultricies tristique nulla aliquet enim tortor.
                Risus feugiat in ante metus dictum at tempor commodo
                ullamcorper. Egestas fringilla phasellus faucibus scelerisque
                eleifend donec pretium. Dignissim enim sit amet venenatis urna
                cursus eget nunc scelerisque. Ultrices tincidunt arcu non
                sodales neque sodales ut etiam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
