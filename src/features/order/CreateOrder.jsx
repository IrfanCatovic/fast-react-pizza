/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const navigation = useNavigation();
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const isSubmitting = navigation.state === "submitting";//submitting je vreme kada se forma salje na server
  //postoje 3 stanja: iddle, submitting i loading
  1;

  //koristi se najvise za prikazivanje errora
  //vraca podatke koje action funkcija vrati nakon submit forme
  const formErrors = useActionData();

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST" > 
        {/*kliknem dugme, dodjem na rutu /order/new i forma salje post zahtev toj ruti
      u app.jsx action: createOrderAction, koja je exportovana iz CreateOrder.jsx
      znaci kad se forma submituje, poziva se createOrderAction funkcija
      */}
        {/* U api stizu podaci iz forme u obliku formData objekta, koji se u action funkciji parsira u normalan objekat
      pomocu Object.fromEntries metode */}
        <div >
          <label>First Name</label>
          <input className="input" type="text" name="customer" required />
          {/* ne moramo da pravimo posebne state varijable za svako polje u formi
        jer react router DOM ima svoj nacin da procesuira formu putem action funkcije
        koja se poziva na submit forme. */}
        </div>

        <div>
          <label>Phone number</label>

            <input className="input" type="tel" name="phone" required />

          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>

            <input className="input" type="text" name="address" required />

        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className=" h-6 w-6 accent-yellow-400 focus:outline-none focus:ring
             focus:ring-yellow-400 focus:ring-offset-2 "
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Placing order" : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  //u ovoj akciji cemo da obradimo podatke iz forme
  //saljemo ih na server i pravimo novu porudzbinu, pa nas na kraju redirektuje na stranicu te porudzbine
  //na serveru cemo da validiramo podatke iz forme i vratimo eventualne greske nazad u komponentu
  const formData = await request.formData();
  const data = Object.fromEntries(formData);


  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;
  //kriran objekat za greske i ako je njegov sadrzaj veci od 0 samo nas vraca
  //ne dozvoljava nam da pravimo novu porudzbinu

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
