export async function getCart(): Promise<any | void> {
    try{
      const res = await fetch("/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await res.json();
    } catch(er: any){
      return {error: er.message}
    }
  }
  