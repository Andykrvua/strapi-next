import Card from '../../components/Card';
import styled from '@emotion/styled';
import { Fetcher } from '../api/fetch';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ConnectionFail from '../../components/ConnectionFail';

export default function Home({ movies, page }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };
    const handleStop = () => {
      setLoading(false);
    };
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
    };
  }, [router]);
  return (
    <>
      <div className="container">
        <CardsStyled>
          {movies ? (
            movies.data.map((item) => {
              return (
                <Card
                  key={item.id}
                  title={item.attributes.title}
                  img={
                    item.attributes.poster.data.attributes.formats.thumbnail.url
                  }
                  slug={item.attributes.slug}
                  genre={
                    item.attributes.genre.data
                      ? item.attributes.genre.data.attributes.slug
                      : 'uncategorized'
                  }
                  width={
                    item.attributes.poster.data.attributes.formats.thumbnail
                      .width
                  }
                  height={
                    item.attributes.poster.data.attributes.formats.thumbnail
                      .height
                  }
                />
              );
            })
          ) : (
            <ConnectionFail />
          )}
        </CardsStyled>
        {movies ? (
          <div>
            <button
              onClick={() => router.push(`/movies?page=${+page - 1}`)}
              disabled={page == 1 || loading ? true : false}
            >
              Prev
            </button>
            <button
              onClick={() => router.push(`/movies?page=${+page + 1}`)}
              disabled={
                movies.meta?.pagination.pageCount == page || loading
                  ? true
                  : false
              }
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}

const CardsStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
`;

export async function getServerSideProps({ query: { page = 1 } }) {
  const data = await Fetcher(
    `movies?populate=poster,genre&pagination[page]=${page}&pagination[pageSize]=3`
  );

  return {
    props: {
      movies: data,
      page: page,
    },
  };
}
