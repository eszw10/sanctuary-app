"use client";

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteBooking } from "../../_lib/actions";

export default function ReservationList({ bookings }) {
  const [optimisticBookings, deleteOptimisticBooking] = useOptimistic(
    bookings,
    (currentBookings, bookingId) => {
      currentBookings?.map((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId) {
    deleteOptimisticBooking(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings?.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
