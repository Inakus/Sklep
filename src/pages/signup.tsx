import { SignUp } from "@clerk/nextjs";
import Layout from "./layout";

export default function Page() {
  return (
    <Layout>
      <div className="flex min-h-screen items-center justify-center">
        <SignUp />
      </div>
    </Layout>
  );
}
