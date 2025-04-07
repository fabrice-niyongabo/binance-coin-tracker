import Navigator from "@/components/future/navigator";
import SideBar from "@/components/future/sidebar";
import { AppContextProvider } from "@/context";

function Futures() {
  return (
    <AppContextProvider>
      <SideBar />
      <div className="h-screen ml-80 w-[calc(100vw-20rem)] p-10">
        <Navigator />
      </div>
    </AppContextProvider>
  );
}

export default Futures;
