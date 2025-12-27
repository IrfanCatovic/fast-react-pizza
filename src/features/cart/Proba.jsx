import React, { useState } from "react";

function ItemList() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function addItem() {
    if (inputValue.trim() === "") return;

    const newItem = {
      id: Date.now(),
      name: inputValue
    };

    setItems([...items, newItem]);
    setInputValue("");
  }

  function removeItem(id) {
    setItems(items.filter(function (item) {
      return item.id !== id;
    }));
  }

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>My Items</h2>

      <input
        type="text"
        value={inputValue}
        placeholder="Add new item"
        onChange={function (e) {
          setInputValue(e.target.value);
        }}
      />

      <button onClick={addItem}>Add</button>

      <ul>
        {items.map(function (item) {
          return (
            <li key={item.id}>
              {item.name}
              <button onClick={function () {
                removeItem(item.id);
              }}>
                ❌
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ItemList;
