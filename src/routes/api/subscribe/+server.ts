import { json } from '@sveltejs/kit'
import mailchimp from '@mailchimp/mailchimp_marketing';
let listId = "94ce7f322a"
mailchimp.setConfig({
  apiKey: "3678bc0be59cadf281bd9bea9fdafee8-us9",
  server: "us9",
});

async function subscribe(email:string) {
    const response:any = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: "subscribed",
    });
  }
  

export async function POST({request}) {
    const { user_email } = await request.json()
    await subscribe(user_email)
    return json({user_email})
}