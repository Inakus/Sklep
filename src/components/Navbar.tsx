import { useEffect, useState } from "react";
import ShoppingCart from "./ShopingCart";
import Link from "next/link";
import { SignOutButton, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export default function Navbar() {
  const { user } = useClerk();
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["theme"]);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
  const [isDark, setIsDark] = useState<boolean>(cookies.theme);

  const setCookieHandler = () => {
    setIsDark(!isDark);
    setCookie("theme", !isDark, { path: "/" });
  };

  useEffect(() => {
    document
      .querySelector("html")
      ?.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div className="navbar sticky top-0 z-20 justify-center bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          Skelp
        </Link>
      </div>
      <div className="flex-none">
        <ShoppingCart />
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
            {user && (
              <li>
                <Link href={"/profil"} className="justify-between">
                  Profil
                </Link>
              </li>
            )}
            {user && (
              <li>
                <SignOutButton>
                  <a>Wyloguj</a>
                </SignOutButton>
              </li>
            )}
            {!user && (
              <li>
                <a onClick={() => router.push("/signin")}>Zaloguj</a>
              </li>
            )}
            {!user && (
              <li>
                <a onClick={() => router.push("/signup")}>Zarejestruj się</a>
              </li>
            )}
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
                  value={!isDark ? "light" : "dark"}
                  onChange={setCookieHandler}
                  checked={isDark}
                  className=" toggle"
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
