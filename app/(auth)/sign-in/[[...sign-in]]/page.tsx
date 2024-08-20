import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <div>
        <Image
          src="/assets/logo.svg"
          alt=""
          width={33}
          height={27}
          className="mx-auto mb-20"
        />
        <SignIn
          appearance={{
            baseTheme: dark,
          }}
        />
      </div>
    </>
  );
}
