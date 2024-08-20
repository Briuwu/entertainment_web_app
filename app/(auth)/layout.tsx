export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid min-h-screen justify-center bg-blue-900 pt-20">
      {children}
    </main>
  );
}
