import { useEffect } from "react";
import { themeChange } from "theme-change";
import ShoppingCart from "./ShopingCart";
import Link from "next/link";

export default function Navbar() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="navbar sticky top-0 z-50 justify-center bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          daisyUI
        </Link>
      </div>
      <div className="flex-none">
        <ShoppingCart
          items={[
            { name: "Item 1", price: 10 },
            { name: "Item 2", price: 20 },
          ]}
        />

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="avatar btn btn-circle btn-ghost"
          >
            <div className="w-10 rounded-full">
              <img src="/static/user.png" alt="test" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>

            <li>
              <a>Logout</a>
            </li>
            <li>
              <label className="flex cursor-pointer gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
                <input
                  type="checkbox"
                  value="dark"
                  className="theme-controller toggle"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
