import { json } from "@sveltejs/kit";
import { PUBLIC_API_ENDPOINT } from "$env/static/public";

export async function GET({ cookies }) {
  const obj: any = {
    "Content-Type": "application/json",
  };

  cookies.getAll().forEach((cookie) => {
    obj[cookie.name] = cookie.value;
  });

  const responseGet = await fetch(`${PUBLIC_API_ENDPOINT}/cart`, {
    method: "GET",
    headers: obj,
  });

  const dataGet = await responseGet.json();

  return json(dataGet);
}
