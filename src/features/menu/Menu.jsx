import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData();
  //useLoaderData - hook koji nam omogucava da dohvatimo podatke koje je loader funkcija vratila i cuvamo ga u menu
  //prvo se kreira ovaj const menu, a tek onda const menu u loader funkciji ispod, to su dve razlicite stvari

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  //ovo je funkcija koja se poziva pre nego sto se prikaze komponenta Menu
  //zbog toga imamo u app.jsx u ruti za /menu property loader: menuLoader
  const menu = await getMenu();
  return menu;
}

export default Menu;
