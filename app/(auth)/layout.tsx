const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex items-center justify-center min-h-screen w-full bg-cover bg-fixed bg-center">
      {children}
    </section>
  );
};

export default Layout;
