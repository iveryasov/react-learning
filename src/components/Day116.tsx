import { useState } from 'react';

// Day 116
// Interactive player card

function Day116() {
  const [coins, setCoins] = useState<number>(0);
  const [status, changeStatus] = useState<boolean>(true);

  type Role = "Warrior" | "Mage" | "Archer";
  const [role, changeRole] = useState<Role>("Warrior");

  const handleRoleChange = () => {
    if (role === "Warrior") {
      changeRole("Mage");
    } else if (role === "Mage") {
      changeRole("Archer");
    } else {
      changeRole("Warrior");
    }
  };

  return (
    <div className="player-card">
      <div>
        <h1>Player Ivan</h1>
        <p>Status: {status ? "Online 🟢" : "Offline 🔴"}</p>
        <button onClick={() => changeStatus(!status)}>Change player status</button>
      </div>
      <div>
        <h2>Coins: {coins} 🪙</h2>
        <button disabled={!status} onClick={() => setCoins(coins + 10)}>Mine +10 coins</button>
        <button onClick={() => setCoins(0)}>Reset balance</button>
          <div>
            <h3>Role: {role}</h3>
            <button onClick={() => handleRoleChange()}>Change player role</button>
          </div>
      </div>
    </div>
  )
}

export default Day116;