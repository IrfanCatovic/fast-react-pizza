import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";
import Timer from "./Timer";

function AppLayout() {
  const navigation = useNavigation();
  //applayout uz pomoc useNavigation ima mogucnost da vidi da li se neka ruta ucitava jer je parent nad svim rutama

  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen  grid-rows-[auto_1fr_auto]  "> 
    {/*auto_1fr_auto znaci imamo 3 grid reda i dajemo im velicine prva je auto, drugo 1fr, treca auto */}
      
      
      <Header />
      
      {isLoading && <Loader />}

    <div className="overflow-scroll">
      <main className=" max-w-3xl mx-auto">
        <Outlet />
        {/*Outlet je komponenta koja prikazuje sadrzaj stranice u zavisnosti od trenutne rute, 
        u praksi to znaci da ce se prikazati sadrzaj stranice koja je aktivna
        to definisemo App.jsx a znaci da je parent  element: <AppLayout />, a children pages koje definisemo preko ruta*/}
      </main>
    </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
