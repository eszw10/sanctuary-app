import Logo from "@/app/_components/ui/Logo";
import Navigation from "@/app/_components/ui/Navigation";
import "@/app/_styles/globals.css";
import "react-day-picker/style.css";

import { Josefin_Sans } from "next/font/google";
import Header from "./_components/ui/Header";
import { ReservationProvider } from "./_components/reservation/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | Sanctuary",
    default: "Sanctuary",
  },
  description:
    "Luxurious cabin hotel, located in the heart of Italian Dolomites, Surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-primary-950 text-primary-50 min-h-screen ${josefin.className} flex flex-col`}
      >
        <Header />
        <div className="px-8 py-12 grid flex-1">
          <ReservationProvider>
            <main className="max-w-7xl mx-auto w-full">{children}</main>
          </ReservationProvider>
        </div>
      </body>
    </html>
  );
}
