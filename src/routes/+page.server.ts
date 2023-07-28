import { PUBLIC_API_ENDPOINT } from '$env/static/public';
export const load = async ({fetch }) => {
  const resourceUrl = `${PUBLIC_API_ENDPOINT}/products`;
  const options = {
    method: 'GET',
    headers: {
        Nonce: '',
        'Content-Type': 'application/json'
    },
  }

  try {
    const res = await fetch(resourceUrl, options);
    const data = await res.json();
    if (res.ok) {
      return { status: 200, products: data };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, body: { message: 'Something went wrong' } };
  }
}