import Head from 'next/head';
import Card from '../components/Card';
import styled from '@emotion/styled';
import { FetcherAuth } from './api/fetch';
import { parseCookies } from 'nookies';

export default function PayedArticles({ payed }) {
  return (
    <>
      {payed ? (
        <div className="container">
          <h3>{payed.data.attributes.title}</h3>
          <div
            dangerouslySetInnerHTML={{ __html: payed.data.attributes.body }}
          ></div>
        </div>
      ) : (
        <div className="container">Need Login</div>
      )}
    </>
  );
}

const CardsStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
`;

export async function getServerSideProps(ctx) {
  const jwt = parseCookies(ctx).jwt;

  const data = await FetcherAuth('payed-articles/1', jwt);

  return {
    props: {
      payed: data,
    },
  };
}
