export async function getVariations(attributes: string | any[], variations: any[]) {
    let variationIds: number[] = [];

    if (attributes.length > 0) {
      variations.forEach((variation) => {
        variationIds.push(variation.id);
      });
    }

    if (attributes.length > 0) {
    
      const response = await fetch("/api/product/get-variation", {
        method: "POST",
        body: JSON.stringify({ variations: variationIds }),
      });

      const data = await response.json();
      return data;
    }
  }