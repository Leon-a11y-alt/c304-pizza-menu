import { useState } from "react";
import pizzaData from "./data";

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

// Shop is open from 10am to 10pm
function isShopOpen() {
  const hour = new Date().getHours();
  const openHour = 10;
  const closeHour = 22;
  return hour >= openHour && hour < closeHour;
}

function Header() {
  const isOpen = isShopOpen();

  return (
    <header className="header">
      <h1>Andy's Pizza Co.</h1>
      {isOpen && <p className="tagline">Authentic Italian Cuisine</p>}
    </header>
  );
}

function Menu() {
  const [search, setSearch] = useState("");

  const filteredPizzas = pizzaData.filter((pizza) =>
    pizza.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="menu">
      <h2>Our Menu</h2>

      <input
        className="search"
        type="text"
        placeholder="Search for a pizza..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="pizzas">
        {filteredPizzas.map((pizza) => (
          <Pizza
            key={pizza.name}
            name={pizza.name}
            ingredients={pizza.ingredients}
            price={pizza.price}
            photoName={pizza.photoName}
          />
        ))}
      </ul>
    </main>
  );
}

function Pizza(props) {
  return (
    <li className="pizza">
      <img src={props.photoName} alt={props.name} />
      <div>
        <h3>{props.name}</h3>
        <p>{props.ingredients}</p>
        <span>${props.price}</span>
      </div>
    </li>
  );
}

function Footer() {
  const isOpen = isShopOpen();

  return (
    <footer className="footer">
      {isOpen ? <Order /> : <p>Sorry, we're closed</p>}
    </footer>
  );
}

function Order() {
  return (
    <div className="order">
      <p>We're currently open</p>
      <button className="btn">Order</button>
    </div>
  );
}

export default App;
