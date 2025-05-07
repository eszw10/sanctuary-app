import CabinList from "../_components/cabin/CabinList";
import { Suspense } from "react";
import Spinner from "../_components/ui/Spinner";
import Filter from "../_components/ui/Filter";
import ReservationReminder from "../_components/reservation/ReservationReminder";

export const metadata = {
  title: "Cabins",
};

export const revalidate = 3600; // revalidate (trigger dynamic route)

export default function Page({ searchParams }) {
  // CHANGE
  const cabinsFilter = searchParams?.capacity ?? "all";
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <Filter />
      <Suspense fallback={<Spinner />} key={cabinsFilter}>
        <CabinList filter={cabinsFilter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
