import Header from "./Header";
import CartDrawer from "../../carrito/CartDrawer";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header />
      <main>
        {children}
      </main>
      <CartDrawer />
    </div>
  );
}

export default Layout;