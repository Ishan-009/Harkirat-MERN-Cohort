import axios from "axios";
import { useState } from "react";

export default function page() {
  async function handler() {
    const response = await axios.post("");
  }

  return (
    <div>
      <div className="form">
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
        <div className="submit-button">
          <button onClick={handler}></button>
        </div>
      </div>
    </div>
  );
}
