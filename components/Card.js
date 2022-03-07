import styled from '@emotion/styled';
import Link from 'next/link';
import Image from 'next/image';
import { shimmer, toBase64 } from '../utils';

export default function Card({ title, img, slug, genre = '', width, height }) {
  if (genre) {
    genre = genre + '/';
  }

  return (
    <CardStyled>
      <Link href={`/movies/${genre}${slug}`}>
        <a>
          <h3>{title}</h3>
          <div>
            <Image
              src={`${process.env.NEXT_PUBLIC_IMG_URL}${img}`}
              width={width}
              height={height}
              layout="responsive"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(width, height)
              )}`}
            />
          </div>
        </a>
      </Link>
    </CardStyled>
  );
}

const CardStyled = styled.div`
  background-color: #c9d3e1;
  color: ${(props) => props.theme.colors.primary};
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  a {
    width: 100%;
  }
  h3 {
    margin: 0 0 15px;
  }
  div {
    position: relative;
    display: block;
    height: 320px;
  }
`;
