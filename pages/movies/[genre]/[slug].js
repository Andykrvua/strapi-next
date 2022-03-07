import styled from '@emotion/styled';
import { Fetcher } from '../../api/fetch';

export default function Movie({ movie }) {
  console.log(movie);

  return (
    <div className="container">
      {movie ? (
        <MovieStyled>
          <h1>{movie.data[0].attributes.title}</h1>
          <img
            src={`${process.env.NEXT_PUBLIC_IMG_URL}${movie.data[0].attributes.poster.data.attributes.url}`}
            alt=""
          />
        </MovieStyled>
      ) : null}
    </div>
  );
}

const MovieStyled = styled.div``;

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const data = await Fetcher(`movies?filters[slug]=${slug}&populate=poster`);
  return {
    props: { movie: data },
  };
}
