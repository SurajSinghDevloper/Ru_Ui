import { GlobalContextProvider } from "context/store";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Naac",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:," />
      </head>
      <body className="loginpage">
        <GlobalContextProvider>{children}</GlobalContextProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
