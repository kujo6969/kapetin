"use client";
import AllMenu from "@/components/AllMenu";
import BillingWeb from "@/components/BillingWeb";
import CoffeeList from "@/components/CoffeeList";
import SearchItem from "@/components/SearchItem";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMenuState } from "@/stores/menu_selection_store";

export default function Home() {
  const { menu } = useMenuState();
  const mobile = useIsMobile();
  return (
    <div className="flex flex-col flex-1">
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-9">
          <SearchItem />
          {menu === 1 && <AllMenu />}
          {menu === 2 && <CoffeeList />}
          {menu === 3 && <CoffeeList />}
          {menu === 4 && <CoffeeList />}
          {menu === 5 && <CoffeeList />}
        </div>
        {!mobile && (
          <div className="col-span-3 border "><BillingWeb /></div>
        )}
      </div>
    </div>
  );
}
