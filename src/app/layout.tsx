import Topbar from "@/components/Topbar";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-gray-800 antialiased dark:text-gray-400">
        <Topbar />
        <div className="container lg:max-w-7xl mx-auto ">
          {children}
          <ToastContainer />
        </div>
          <Footer/>
      </body>
    </html>
  );
}
