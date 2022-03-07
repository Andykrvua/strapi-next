import styled from '@emotion/styled';
import Navigation from './Navigation';
import Link from 'next/link';

export default function Header({ isDark }) {
  return (
    <HeaderStyled isDark={isDark}>
      <div className="container header">
        <Link href="/">
          <a>
            <div>Logo</div>
          </a>
        </Link>
        <Navigation />
      </div>
    </HeaderStyled>
  );
}

const HeaderStyled = styled.header`
  background-color: ${(props) => (props.isDark ? '#646a72' : '#eee')};
  color: ${(props) => props.theme.colors.font};
  .header {
    display: flex;
    justify-content: space-between;
  }
`;
