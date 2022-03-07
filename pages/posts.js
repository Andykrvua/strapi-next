import Post from '../components/Post';
import ConnectionFail from '../components/ConnectionFail';
import { Fetcher } from './api/fetch';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';

export default function Posts({ data }) {
  // console.log(post);
  const [post, setPost] = useState(data.data);
  const [page, setPage] = useState(2);
  const [hasmore, setHasMore] = useState(true);

  const getMorePosts = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}posts?pagination[page]=${page}&pagination[pageSize]=10`
    );
    const newPosts = await res.json();
    setPost((post) => [...post, ...newPosts.data]);
    if (page === +data.meta.pagination.pageCount) {
      setHasMore(false);
    } else {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="container">
      <InfiniteScroll
        dataLength={post.length}
        next={getMorePosts}
        hasMore={hasmore}
        loader={<h4>Loading...</h4>}
        endMessage={<h4>You see all posts</h4>}
      >
        {post ? (
          post.map((item) => {
            return (
              <Post
                key={item.id}
                title={item.attributes.title}
                content={item.attributes.content}
              />
            );
          })
        ) : (
          <ConnectionFail />
        )}
      </InfiniteScroll>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await Fetcher(
    'posts?pagination[page]=1&pagination[pageSize]=10'
  );

  return {
    props: {
      data,
    },
  };
}
