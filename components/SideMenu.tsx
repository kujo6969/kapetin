"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { menuList } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useMenuState } from "@/stores/menu_selection_store";
const SideMenu = () => {
  const { menu, selectMenu } = useMenuState();

  return (
    <div>
      <Sidebar>
        <SidebarHeader className="flex justify-center items-center">
          <Image alt="logo" src={"/logo_1.png"} width={300} height={300} />
        </SidebarHeader>
        <SidebarContent className="p-7">
          <SidebarGroup>
            {menuList.map((data, i) => (
              <Button
                onClick={() => selectMenu(data.id)}
                key={i}
                className={cn(
                  `flex flex-col h-40 w-full rounded-xl mb-5 bg-[#EEEEEE] shadow-md inset-shadow-sm cursor-pointer`,
                  menu === data.id ? "inset-shadow-[#DD9E59] bg-[#A47251]" : "",
                )}
              >
                <Image
                  alt={data.name}
                  src={data.logoSrc}
                  width={70}
                  height={70}
                  loading="eager"
                />
                <p
                  className={cn(
                    "text-lg text-black font-bold",
                    menu === data.id && "text-white",
                  )}
                >
                  {data.name}
                </p>
                {menu === data.id && (
                  <hr className="border-2 border-[#8A5F41] w-[50%]" />
                )}
              </Button>
            ))}
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </div>
  );
};

export default SideMenu;
