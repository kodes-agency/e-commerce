import { json } from '@sveltejs/kit'
import { PUBLIC_API_ENDPOINT } from '$env/static/public';


export async function POST({request, fetch}){
    const { variations } = await request.json()

    let data
    
    if(variations){
        try{
            data = Promise.all(variations.map(async (variation: any) =>{
                const response = await fetch(`${PUBLIC_API_ENDPOINT}/products/${variation}`, {
                    method: "GET",
                })
                return await response.json()
            }))
            return json( await data ) 
        } catch(er: any){
            return json ({error: er})
        }
    }
}