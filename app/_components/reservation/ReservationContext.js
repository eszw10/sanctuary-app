"use client";
const { createContext, useContext, useState } = require("react");

const ReservationContext = createContext();
const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);
  function resetRange() {
    setRange(initialState);
  }
  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Reservation Provider is used outside of the context");
  return context;
}

export { ReservationProvider, useReservation };
