import styled from '@emotion/styled';
import { Fetcher } from './api/fetch';
import Select from 'react-select';
import { useQuery, useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';

const getMovies = async (key) => {
  const genreId = key.queryKey[1].genres;
  const actorsIds = key.queryKey[2].actors.map((id) => `filters[actors]=${id}`);
  const actorsQueryString = actorsIds.join('&');
  if (genreId && actorsQueryString) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}movies?populate=genre,actors&filters[genre]=${genreId}&${actorsQueryString}`
    );
    return res.json();
  }
  if (genreId) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}movies?populate=genre,actors&filters[genre]=${genreId}`
    );
    return res.json();
  }
  if (actorsQueryString) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}movies?populate=genre,actors&${actorsQueryString}`
    );
    return res.json();
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}movies?populate=genre,actors`
  );
  return res.json();
};

export default function FilterMovies({ movies, actors, genres }) {
  const queryClient = useQueryClient();
  const [genresId, setGenreId] = useState(null);
  const [actorsIds, setActors] = useState([]);
  const { data, status } = useQuery(
    ['movies', { genres: genresId }, { actors: actorsIds }],
    getMovies,
    {
      initialData: movies,
    }
  );

  return (
    <>
      <div className="container">
        <CardsStyled>
          <Select
            options={actors.data}
            getOptionLabel={(option) =>
              `${option.attributes.first_name} ${option.attributes.last_name}`
            }
            instanceId="actors"
            isMulti
            placeholder="Filter by Actors"
            getOptionValue={(option) => option.id}
            onChange={(values) => setActors(values.map((actor) => actor.id))}
          />
          <Select
            options={genres.data}
            getOptionLabel={(option) => option.attributes.title}
            instanceId="genres"
            isClearable
            placeholder="Filter by Genres"
            getOptionValue={(option) => option.id}
            onChange={(value) => setGenreId(value ? value.id : null)}
          />
          {status === 'loading' ? <div>Loading movies...</div> : null}
          {status === 'error' ? <div>Something went wrong</div> : null}
          {data && status === 'success'
            ? data.data.map((item) => {
                return (
                  <div key={item.id}>
                    <h4>
                      {item.attributes.title}{' '}
                      {item.attributes.genre.data
                        ? item.attributes.genre.data.attributes.title
                        : 'uncategorized'}
                    </h4>
                    <div>
                      {item.attributes.actors.data.map((actor, i) => {
                        return (
                          <p key={i}>
                            {actor.attributes.first_name}{' '}
                            {actor.attributes.last_name}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            : null}
        </CardsStyled>
      </div>
    </>
  );
}

const CardsStyled = styled.div``;

export async function getServerSideProps() {
  const data = await Fetcher('movies?populate=genre,actors');
  const genresData = await Fetcher('genres');
  const actorsData = await Fetcher('actors');

  return {
    props: {
      movies: data,
      genres: genresData,
      actors: actorsData,
    },
  };
}
