import { getClient } from "$lib/functions/getClient";
import query from "$lib/queries/gdprPageQuery.js";

/** @type {import('@sveltejs/kit').Load} */
export const load = async () => {
  
  const data = getClient().query({
      query: query()
  })

  return data;
}