import SideBar from "@/components/sidebar";
import { AppContextProvider } from "@/context";

export default function Home() {
  return (
    <AppContextProvider>
      <div className="h-full "></div>
      <SideBar />
    </AppContextProvider>
  );
}
