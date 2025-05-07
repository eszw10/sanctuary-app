"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeFilter = searchParams.get("capacity") ?? "all";
  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className=" flex mb-5 gap-4 justify-end">
      <FilterButton
        filter={"all"}
        handleFilter={() => handleFilter("all")}
        activeFilter={activeFilter}
      >
        All Cabins
      </FilterButton>
      <FilterButton
        filter={"small"}
        handleFilter={() => handleFilter("small")}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </FilterButton>
      <FilterButton
        filter={"medium"}
        handleFilter={() => handleFilter("medium")}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </FilterButton>
      <FilterButton
        filter={"large"}
        handleFilter={() => handleFilter("large")}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </FilterButton>
    </div>
  );
}

function FilterButton({ children, filter, handleFilter, activeFilter }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 border border-primary-800 ${
        filter === activeFilter && "bg-primary-700 text-primary-50"
      }`}
      onClick={handleFilter}
    >
      {children}
    </button>
  );
}
