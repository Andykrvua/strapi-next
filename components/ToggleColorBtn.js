import HeaderContext from '../context/HeaderContext';
import { useContext } from 'react';

export default function ToggleColorBtn() {
  const { toggleValue } = useContext(HeaderContext);

  return (
    <li>
      <button onClick={() => toggleValue((prev) => !prev)}>Toggle</button>
    </li>
  );
}
