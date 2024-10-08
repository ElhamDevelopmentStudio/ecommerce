import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "@/components/MainNav";
import StoreSwitcher from "@/components/StoreSwitcher";
import prismadb from "@/lib/Prismadb";
import { redirect } from "next/navigation";
import { ModeToggle } from "./ui/mode-toggle";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center sapace-x-4 gap-x-4">
          <UserButton afterSignOutUrl="/" />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
