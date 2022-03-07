import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { setCookie, parseCookies } from 'nookies';
import { useContext } from 'react';
import HeaderContext from '../context/HeaderContext';
import ConnectionFail from '../components/ConnectionFail';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [apierror, setApierror] = useState(false);
  let resp;
  const { setUsername } = useContext(HeaderContext);
  async function handleLogin() {
    const loginInfo = {
      identifier: email,
      password,
    };
    try {
      setApierror(false);
      const login = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}auth/local/`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginInfo),
        }
      );
      resp = await login.json();
      if (resp.jwt) {
        setUser(resp.user.username);
        setUsername(resp.user.username);
        setCookie(null, 'jwt', resp.jwt, {
          maxAge: 30 * 2 * 60 * 60,
          path: '/',
        });
        setCookie(null, 'name', resp.user.username, {
          maxAge: 30 * 2 * 60 * 60,
          path: '/',
        });
      }
    } catch (error) {
      console.log(error);
      setApierror(true);
    }
  }

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.jwt) {
      setUser('UserName');
    }
  });

  return (
    <div className="container">
      <h3>Login</h3>
      {user ? <div>Hello {user}</div> : null}
      {!user ? (
        <form>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="email"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="password"
          />
          <button type="button" onClick={() => handleLogin()}>
            Login
          </button>
        </form>
      ) : null}
      {apierror ? <ConnectionFail /> : null}
    </div>
  );
}

const CardsStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
`;
