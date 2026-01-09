# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Na osnovu slike koju si poslao, koja prikazuje strukturu foldera u nekom razvojnom okruženju (verovatno VS Code ili sličan editor), mogu da zaključim da se radi o frontend projektu baziranom na React.js framework-u. Specifično, ovo izgleda kao aplikacija za naručivanje hrane iz restorana (npr. nešto poput online food delivery servisa, slično Uber Eats ili Glovo-u, ali jednostavnije). Zaključak sam doneo na osnovu naziva foldera i fajlova: vidimo komponente vezane za korpu (Cart), meni (Menu), narudžbine (Order), korisnike (User), API za restorane (apiRestaurant.js), i opšte UI elemente. Projekat koristi Vite kao build tool (vidljivo po vite.config.js), Redux Toolkit za upravljanje stanjem (zbog Slice.js fajlova), Tailwind CSS za stilizovanje (tailwind.config.js), i verovatno React Router za navigaciju (zbog komponenti poput AppLayout.jsx i Home.jsx).
Ovo nije puna full-stack aplikacija – fokus je na frontend-u, sa mogućim konekcijama na backend API (preko services foldera). Nema vidljivih backend elemenata poput servera ili baze podataka u ovoj strukturi, pa pretpostavljam da se radi o klijentskoj strani koja komunicira sa eksternim API-jem.
Sada ću detaljno objasniti strukturu: gde se šta nalazi, kako šta funkcioniše, gde se šta pamti (čuva u memoriji ili stanju), šalje (npr. podaci ka serveru), i računa (npr. kalkulacije). Koristiću hijerarhijski pristup da bude jasno, bazirano na slici. Ako sam nešto pogrešno protumačio (slika je screenshot, pa moguća greška u OCR-u), reci mi za korekciju.

1. Opšta Struktura Projekta

Root folder (korenski direktorijum): Sadrži standardne fajlove za React/Vite projekat:
node_modules/: Folder sa instaliranim paketima (dependencijama) poput React-a, Redux-a, itd. Ovo se automatski generiše preko npm install ili yarn install. Ne diraj ga ručno.
public/: Statični resursi koji se ne kompajluju, poput favicon.ico, index.html (osnovni HTML template), ili slika/fontova. Ovo je mesto gde se nalaze fajlovi koji se direktno serviraju korisniku bez obrade.
src/: Glavni folder sa izvornim kodom aplikacije. Ovo je srce projekta – tu su komponente, logika, stilovi.
vite.config.js: Konfiguracija za Vite (brzi build tool za React). Ovde se definišu plugini, proxy za API, itd. Funkcioniše tako što Vite koristi ES modules za brzo development i build.
Ostali fajlovi u root-u (vidljivi na slici): package.json (definiše dependencije i skripte), package-lock.json (loks dependencije), .gitignore (ignoruje fajlove za Git), prettier.config.js (konfiguracija za code formatting sa Prettier-om), README.md (dokumentacija projekta), eslint.rc.js ili slično (konfiguracija za ESLint, tool za linting koda), tailwind.config.js (konfiguracija za Tailwind CSS, utility-first CSS framework).

Kako funkcioniše ceo projekat?
Pokreće se preko Vite-a: npm run dev za development server (localhost:5173 ili slično).
Glavni ulazni fajl: src/main.jsx – tu se renderuje root komponenta (<App />) u DOM (preko ReactDOM).
Stilovi: index.css (globalni CSS, verovatno importuje Tailwind).
State management: Redux (konfigurisano u stores.js ili sličnom, gde se kombinuju slice-ovi).
Navigacija: Verovatno React Router (nije eksplicitno vidljiv, ali komponente poput Home.jsx i AppLayout.jsx sugerišu rute poput /home, /cart, /order).
API komunikacija: Preko services/apiRestaurant.js – ovo je modul za fetchovanje podataka (npr. meni, narudžbine) sa backend servera, verovatno koristeći fetch ili axios.


2. Detaljan Pregled Foldera u src/

features/: Ovde su glavne "funkcionalnosti" aplikacije, organizovane po domenima (feature slices). Ovo je Redux pattern: svaka feature ima svoje komponente, Redux slice (za state), i akcije. Ovo omogućava modularnost – svaka feature može da se razvija nezavisno.
Cart/ (Korpa za naručivanje):
Komponente: CartItem.jsx (prikaz pojedinačnog item-a u korpi), CartOverview.jsx (pregled korpe, npr. ukupna cena), DeleteItem.jsx (brisanje item-a), EmptyCart.jsx (prazna korpa), UpdateItemQuantity.jsx (ažuriranje količine).
State: CartSlice.js – Redux slice gde se pamti stanje korpe (item-i, količine, ukupna cena). Pamti se u Redux store-u (globalno stanje aplikacije).
Kako funkcioniše: Korisnik dodaje item-e iz menija; Redux akcije (addItem, updateQuantity, deleteItem) menjaju state. Računa se ukupna cena ovde (u reducer-ima slice-a, koristeći funkcije poput reduce() na array-u item-a).
Šalje: Kada se kreira narudžbina, podaci iz korpe se šalju ka API-ju (preko apiRestaurant.js).

Menu/ (Meni restorana):
Komponente: Menu.jsx (prikaz celog menija), MenuItem.jsx (pojedinačni item, npr. pizza sa cenom).
Kako funkcioniše: Fetchuje meni sa API-ja (preko services), prikazuje listu. Dodavanje u korpu šalje akciju ka Cart slice-u.
Pamti: Podaci o meniju se pamte u Redux state-u (verovatno u MenuSlice.js, ali nije vidljiv – možda je integrisano u Cart ili Order).
Računa: Možda filtriranje ili sortiranje item-a (u komponentama ili helper-ima).

Order/ (Narudžbine):
Komponente: CreateOrder.jsx (forma za kreiranje narudžbine), Order.jsx (prikaz narudžbine), OrderItem.jsx (detalji item-a), SearchOrder.jsx (pretraga narudžbina), UpdateOrder.jsx (ažuriranje, npr. prioritet).
State: Verovatno OrderSlice.js (nije vidljiv, ali logično), pamti aktivne narudžbine, istoriju.
Kako funkcioniše: Korisnik potvrđuje korpu → kreira order preko API-ja. Search pretražuje po ID-u.
Šalje: Podaci (adresa, item-i, plata) se šalju na server (POST request u apiRestaurant.js).
Računa: Ukupna cena, dostava, itd. – u reducer-ima ili komponentama.
Pamti: Narudžbine se pamte na serveru (baza podataka), lokalno u Redux-u za trenutnu sesiju.

User/ (Korisnici):
Komponente: CreateUser.jsx (registracija ili login), UserName.jsx (prikaz imena).
State: UserSlice.js – pamti korisnički data (ime, email, token za auth).
Kako funkcioniše: Autentikacija, verovatno preko API-ja (login/register).
Šalje: Korisnički podaci se šalju na server za auth.
Pamti: U Redux-u lokalno, na serveru trajno (baza).


services/: Moduli za komunikaciju sa eksternim servisima (backend-om).
apiRestaurant.js: Glavni API client. Ovde se definišu funkcije poput getMenu(), createOrder(), getOrder(id), itd. Koristi fetch ili Axios za HTTP request-ove.
Kako funkcioniše: Komponente pozivaju ove funkcije (npr. u useEffect hook-ovima), dobijaju JSON response.
Šalje: Sve request-ove ka serveru (GET za meni, POST za order, PATCH za update).
Pamti: Ništa lokalno – samo prosleđuje podatke ka Redux-u.

ui/: Opšte UI komponente, reusable (ponovno upotrebljive).
Komponente: AppLayout.jsx (glavni layout sa header-om, footer-om), Button.jsx (custom button), Error.jsx (prikaz grešaka), Header.jsx (zaglavlje, npr. logo), Home.jsx (početna strana), LinkButton.jsx (button sa link-om), Loader.jsx (loading spinner).
Kako funkcioniše: Ove se importuju u feature komponente. Npr. Loader se prikazuje dok se fetchuju podaci.
Pamti: Ništa specifično – koriste props iz parent komponenti.

utils/: Helper funkcije i opšti alati.
helpers.js: Verovatno utility funkcije, poput formatiranja cene, datuma, ili kalkulacija (npr. calculateTotalPrice()).
App.jsx: Glavna app komponenta, gde se setuje Router i Provider za Redux.
index.css: Globalni stilovi.
main.jsx: Entry point, renderuje App.
stores.js: Konfiguracija Redux store-a (combineReducers iz svih slice-ova).
Ostalo: ESLint, Gitignore, itd. – za development.


3. Kako Se Šta Pamti, Šalje i Računa?

Pamćenje (State Management):
Lokalno: Redux store (u memoriji browser-a). Svaki slice (CartSlice, UserSlice) čuva deo state-a. Npr. korpa se pamti u CartSlice kao array objekata {item, quantity, price}.
Trajno: Na backend serveru (nije vidljiv ovde), npr. u bazi poput PostgreSQL ili Firebase. Lokalno se može koristiti localStorage za persistenciju (npr. user token).
Nema vidljivog korišćenja Context API ili drugog – fokus na Redux.

Slanje Podataka:
Ka serveru: Preko apiRestaurant.js – HTTP request-ovi (GET za dohvatanje, POST za kreiranje, PATCH za update). Npr. createOrder šalje JSON sa korpom i user info.
Između komponenti: Preko Redux dispatch akcija (npr. addToCart(item)) ili props.
Nema WebSocket-a ili real-time – verovatno polling za update narudžbina.

Računanje (Calculations):
U Redux reducer-ima: Npr. u CartSlice, reducer za updateQuantity računa novu ukupnu cenu (suma price * quantity).
U helper-ima: helpers.js može imati funkcije poput formatCurrency ili calculateDeliveryFee.
U komponentama: Manje kalkulacije, poput prikaza subtotal-a u CartOverview.jsx (koristeći useSelector za čitanje state-a).
Nema kompleksnih algoritama – jednostavne aritmetike za e-commerce.


4. Potencijalni Flow Aplikacije

Korisnik otvara app → Home.jsx prikazuje dobrodošlicu.
Kreira user-a (CreateUser) → pamti u UserSlice.
Pregleda Menu → dodaje u Cart.
Ide na CartOverview → računa total → kreira Order.
SearchOrder za praćenje.

Ako trebaš više detalja o specifičnom fajlu ili kako da pokreneš/izmeniš ovo, reci! Ovo je bazirano samo na strukturi – bez koda, ne mogu 100% da znam implementaciju.