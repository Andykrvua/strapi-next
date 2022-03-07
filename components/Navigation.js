import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import HeaderContext from '../context/HeaderContext';
import ToggleColorBtn from './ToggleColorBtn';
import { destroyCookie } from 'nookies';

export default function Navigation() {
  const { username, setUsername } = useContext(HeaderContext);
  const logout = () => {
    destroyCookie(null, 'jwt');
    destroyCookie(null, 'name');
    setUsername('');
  };
  const router = useRouter();
  const { menuItems, value } = useContext(HeaderContext);

  const StaticNav = () => {
    return (
      <>
        <li>
          <Link href="/about">
            <a className={router.pathname === '/about' ? 'active' : ''}>
              About
            </a>
          </Link>
        </li>
        <li>
          <Link href="/movies">
            <a className={router.pathname === '/movies' ? 'active' : ''}>
              Pagination
            </a>
          </Link>
        </li>
        <li>
          <Link href="/info">
            <a className={router.pathname === '/info' ? 'active' : ''}>Info</a>
          </Link>
        </li>
      </>
    );
  };
  const DinamycNav = () => {
    return menuItems.map((item) => {
      return (
        <li key={item.id}>
          <Link href={item.attributes.slug}>
            <a
              className={
                router.pathname === item.attributes.slug ? 'active' : ''
              }
            >
              {item.attributes.title}
            </a>
          </Link>
        </li>
      );
    });
  };

  return (
    <NavigationStyled value={value}>
      <ul>
        {!menuItems ? <StaticNav /> : <DinamycNav />}
        <li>
          <Link href="/payed-articles">
            <a>Payed</a>
          </Link>
        </li>
        <li>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </li>
        <li>
          <Link href="/register">
            <a>Register</a>
          </Link>
        </li>
        <li>
          <Link href="/filter-movies">
            <a>Filter</a>
          </Link>
        </li>
        <li>
          <Link href="/posts">
            <a>Posts</a>
          </Link>
        </li>
        <ToggleColorBtn />
        {username ? (
          <li>
            <button onClick={logout}>{username}, logout</button>
          </li>
        ) : null}
      </ul>
    </NavigationStyled>
  );
}

const NavigationStyled = styled.div`
  ul {
    display: flex;
    margin: 0;
    list-style: none;
  }
  ul li {
    margin-left: 15px;
  }
  .active {
    font-weight: bold;
  }
  li a {
    color: ${(props) => (props.value ? 'e3e3e3' : '#2a2a70')};
  }
`;
