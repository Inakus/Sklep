import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import CoockieAlert from "~/components/CoockieAlert";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="alert h-[5%] rounded">
        <span>Email: test@test.test | Infolinia: (+48) 123 456 789</span>
      </div>
      <Navbar />
      <main>{children}</main>
      <CoockieAlert />
      <Footer />
    </>
  );
}
