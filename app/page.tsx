import Navigator from "@/components/navigator";
import SideBar from "@/components/sidebar";
import { AppContextProvider } from "@/context";

export default function Home() {
  return (
    <AppContextProvider>
      <SideBar />
      <div className="h-screen ml-80 w-[calc(100vw-20rem)] p-10">
        <Navigator />
      </div>
    </AppContextProvider>
  );
}
