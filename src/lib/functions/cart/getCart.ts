export async function getCart() {
    try{
      const res = await fetch("/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.json();
    } catch(er: any){
      return {error: er.message}
    }
  }
  