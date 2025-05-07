import Spinner from "../_components/ui/Spinner";

export default function CabinsLoading() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-[60vh]">
      <Spinner />
      <p className="text-xl text-primary-200">Loading cabin data..</p>
    </div>
  );
}
