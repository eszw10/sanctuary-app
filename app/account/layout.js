import SideNavigation from "@/app/_components/ui/SideNavigation";

export default function AccountLayout({ children }) {
  return (
    <section className="grid grid-cols-[16rem_1fr] h-full">
      <SideNavigation />
      <main className="py-1 ps-10">{children}</main>
    </section>
  );
}
