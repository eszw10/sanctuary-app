"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
  const session = await auth();
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const updatedData = { nationalID, nationality, countryFlag };
  const regex = /^[a-zA-Z0-9]{6,12}$/;

  if (!session) throw new Error("Please logged in to update your profile");

  if (!regex.test(nationalID))
    throw new Error("please provide valid National ID");

  const { error } = await supabase
    .from("guests")
    .update(updatedData)
    .eq("id", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  const bookings = await getBookings(session.user.guestId);
  const guestIds = bookings.map((booking) => booking.id);

  if (!session) throw new Error("Please logged in to update your reservations");
  if (!guestIds.includes(bookingId))
    throw new Error("You can only delete your own reservations!");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("Please logged in to update your reservations");

  // 2) Authorization
  const bookings = await getBookings(session.user.guestId);
  const guestIds = bookings.map((booking) => booking.id);
  const bookingId = Number(formData.get("id"));

  if (!session) throw new Error("Please logged in to update your reservations");
  if (!guestIds.includes(bookingId))
    throw new Error("You can only update your own reservations!");

  // 3) Create updated data (payload)
  const updatedData = {
    id: formData.get("id"),
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  // 4) Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updatedData)
    .eq("id", bookingId);

  // 5) Error Handling
  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  // 6)revalidation
  revalidatePath("/account/reservations/edit/" + bookingId);

  // 7) Redirect
  redirect("/account/reservations");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("Please logged in to update your reservations");

  const newBooking = {
    ...bookingData,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
    guestId: session.user.guestId,
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${newBooking.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
