import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { Container } from "../components/ui/Container";

export default function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen bg-white text-slate-950 flex flex-col">
      <Header />

      <main className="flex-1">
        {isHome ? (
          <Outlet />
        ) : (
          <Container className="py-10 sm:py-12">
            <Outlet />
          </Container>
        )}
      </main>

      <Footer />
    </div>
  );
}