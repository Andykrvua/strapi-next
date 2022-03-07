export async function Fetcher(url = '') {
  let data;
  try {
    const res = await fetch(`${process.env.API_URL}${url}`);
    data = await res.json();

    if (data.error) {
      data = false;
    }
  } catch (err) {
    console.log('fetch error ', err);
    data = false;
  }
  return data;
}
export async function FetcherAuth(url = '', jwt) {
  let data;
  try {
    const resp = await fetch(`${process.env.API_URL}payed-articles/1`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    data = await resp.json();

    if (data.error) {
      data = false;
    }
  } catch (err) {
    console.log('fetch error ', err);
    data = false;
  }
  return data;
}
