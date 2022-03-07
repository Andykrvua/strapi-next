import { Fetcher } from './api/fetch';
import ConnectionFail from '../components/ConnectionFail';
import { remark } from 'remark';
import html from 'remark-html';

export default function Info({ page, md }) {
  return (
    <div className="container">
      {page ? (
        <div>
          <h1>{page.data.attributes.title}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: md,
            }}
          ></div>
        </div>
      ) : (
        <ConnectionFail />
      )}
    </div>
  );
}

export async function getStaticProps() {
  const data = await Fetcher(`pages/1`);

  const content = await remark()
    .use(html)
    .process(data.data.attributes.content);

  return {
    props: {
      page: data,
      md: content.value,
    },
    revalidate: 10,
  };
}
