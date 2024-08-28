import { Navbar } from "@/components/navbar";

function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="lg:my-16 lg:ml-[164px]">{children}</div>
    </>
  );
}
export default MainLayout;
