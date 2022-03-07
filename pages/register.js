import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import HeaderContext from '../context/HeaderContext';
import { setCookie, parseCookies } from 'nookies';
import ConnectionFail from '../components/ConnectionFail';

export default function Register() {
  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.jwt) {
      setRegister(cookies.name);
    }
  });

  const { setUsername } = useContext(HeaderContext);
  const [email, setEmailR] = useState('');
  const [password, setPasswordR] = useState('');
  const [username, setUsernameR] = useState('');
  const [register, setRegister] = useState('');
  const [error, setError] = useState(false);
  const [apierror, setApierror] = useState(false);

  async function handleRegister() {
    const registerInfo = {
      username,
      email,
      password,
    };

    try {
      setApierror(false);
      const register = await fetch(
        'http://139.59.143.185:3000/api/auth/local/register',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registerInfo),
        }
      );

      const registerResponse = await register.json();
      console.log(registerResponse);
      if (registerResponse.jwt) {
        setRegister(registerResponse.user.username);
        setUsername(registerResponse.user.username);
        setCookie(null, 'jwt', registerResponse.jwt, {
          maxAge: 30 * 2 * 60 * 60,
          path: '/',
        });
        setCookie(null, 'name', registerResponse.user.username, {
          maxAge: 30 * 2 * 60 * 60,
          path: '/',
        });
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setApierror(true);
    }
  }
  const [inputtype, setInputtype] = useState(true);

  return (
    <div className="container">
      <h3>Register</h3>
      {!register ? (
        <FormStyled>
          <input
            type="email"
            onChange={(e) => setEmailR(e.target.value)}
            value={email}
            placeholder="email"
          />
          <input
            type="text"
            onChange={(e) => setUsernameR(e.target.value)}
            value={username}
            placeholder="username"
          />

          <div style={{ position: 'relative' }}>
            <input
              style={{ width: '300px' }}
              type={inputtype ? 'password' : 'text'}
              onChange={(e) => setPasswordR(e.target.value)}
              value={password}
              placeholder="password"
            />
            <button
              style={{ position: 'absolute', right: 0 }}
              onClick={() => setInputtype((prev) => !prev)}
              type="button"
            >
              👀
            </button>
          </div>
          <button type="button" onClick={() => handleRegister()}>
            Register
          </button>
          {apierror ? <ConnectionFail /> : null}
        </FormStyled>
      ) : (
        <div>Welkome {register}</div>
      )}
      {error ? <div>Try again</div> : null}
    </div>
  );
}

const FormStyled = styled.form``;
