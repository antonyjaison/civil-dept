import "./globals.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { Inter, Poppins } from "next/font/google";
import { Providers } from "./redux/provider";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
});

export const metadata = {
  title: "Civil Department GECSKP",
  description:
    "Discover excellence in Civil Engineering at Government Engineering College, Palakkad, Sreekrishnapuram. Explore our academic programs, research initiatives, and the pathway to a promising engineering career.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
