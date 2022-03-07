import HeaderContext from '../context/HeaderContext';
import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';

export default function ContextWrapper({ children, nav }) {
  const [menuItems] = useState(nav);

  const [username, setUsername] = useState('');
  const [value, toggleValue] = useState(true);
  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.name) {
      setUsername(cookies.name);
    }
  });

  return (
    <HeaderContext.Provider
      value={{ menuItems, value, toggleValue, username, setUsername }}
    >
      {children}
    </HeaderContext.Provider>
  );
}
