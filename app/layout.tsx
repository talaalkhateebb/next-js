import "./globals.css";
import Header from "../app/components/Header";
import Footer from "../app/components/Footer";

export const metadata = {
  title: "VIVA Events",
  description: "Luxury Event Planning",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main style={{ minHeight: "70vh", padding: "20px" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
