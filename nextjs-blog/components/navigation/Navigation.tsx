import Link from "next/link";
import React from "react";

const Navigation = () => {
  return (
    <div>
      <Link href="/">Explorer</Link>
      <nav>
        <ul>
          <li>
            <Link href="/cities">Cities</Link>
          </li>
          <li>
            <Link href="/experiences">Experiences</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
