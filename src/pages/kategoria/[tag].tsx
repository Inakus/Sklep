import { useRouter } from "next/router";
import Layout from "../layout";
import Card from "~/components/Card";

export default function Page() {
  const router = useRouter();
  return (
    <Layout>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden "
          >
            Kategorie
          </label>
          <div className="flex min-h-screen flex-col justify-between lg:flex-row">
            <div className="m-3 flex flex-row flex-wrap justify-center gap-6">
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
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
              <a>Solutions</a>
              <ul>
                <li>
                  <a>Design</a>
                </li>
                <li>
                  <a>Development</a>
                </li>
                <li>
                  <a>Hosting</a>
                </li>
                <li>
                  <a>Domain register</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Enterprise</a>
              <ul>
                <li>
                  <a>CRM software</a>
                </li>
                <li>
                  <a>Marketing management</a>
                </li>
                <li>
                  <a>Security</a>
                </li>
                <li>
                  <a>Consulting</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Products</a>
              <ul>
                <li>
                  <a>UI Kit</a>
                </li>
                <li>
                  <a>Wordpress themes</a>
                </li>
                <li>
                  <a>Wordpress plugins</a>
                </li>
                <li>
                  <a>Open source</a>
                  <ul>
                    <li>
                      <a>Auth management system</a>
                    </li>
                    <li>
                      <a>VScode theme</a>
                    </li>
                    <li>
                      <a>Color picker app</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a>Company</a>
              <ul>
                <li>
                  <a>About us</a>
                </li>
                <li>
                  <a>Contact us</a>
                </li>
                <li>
                  <a>Privacy policy</a>
                </li>
                <li>
                  <a>Press kit</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
