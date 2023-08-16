import * as set_cookie_parser from "set-cookie-parser";
import { PUBLIC_API_ENDPOINT } from "$env/static/public";

// import Stripe from 'stripe';
// const stripe = new Stripe('sk_test_51Nf0uTFBSGpk9cy5vRghKZwF9xw0F2ZDyKGQrx9wNrbzPSjj7JL7QLOE5c7weNpozu52R4IE7QcQDASBxMxgOsjo006sgdNBIe', {
//   // @ts-ignore
//   apiVersion: '2020-08-27',
// });

export const load = async ({ fetch, cookies }) => {
  
  const headers: any = { "Content-Type": "application/json" };

  cookies.getAll().forEach((cookie) => {
    headers[cookie.name] = cookie.value;
  });

  const res: any = await fetch(`${PUBLIC_API_ENDPOINT}/checkout`, {
    method: "GET",
    headers: headers,
  });

  const data = await res.json();
  // console.log(data)
  // console.log(data)

  return {
    form: {
      billing_address: {
        first_name: data.billing_address?.first_name || "",
        last_name: data.billing_address?.last_name || "",
        company: data.billing_address?.company || "",
        address_1: data.billing_address?.address_1 || "",
        city: data.billing_address?.city || "",
        postcode: data.billing_address?.postcode || "",
        email: data.billing_address?.email || "",
        phone: data.billing_address?.phone || "",
      }
    },
    paymentMethods:[
      {
        id: "cod",
        title: "Pay on delivery",
        available: true,
      },
      {
        id: "stripe",
        title: "Pay with credit/debit card",
        available: false,
      }
    ]
  };
};

export const actions = {
  default: async ({cookies, fetch, request}) => {
    const formData = await request.formData();

    // let src = await stripe.sources.create({
    //   type: 'card',
    //   currency: 'bgn',
    //   owner: {
    //     email: 'b.denev@live.com', 
    //   }
    // })

    let companyDetails = {
      company: formData.get("company_name"),
      company_tax_number: formData.get("company_tax_number"),
      company_city: formData.get("company_city"),
      company_address: formData.get("company_address"),
      company_country: formData.get("company_country"),
    }

    const order = {
      billing_address: {
        first_name: formData.get("billing_first_name"),
        last_name: formData.get("billing_last_name"),
        address_1: formData.get("billing_address_1"),
        address_2: formData.get("billing_address_2"),
        city: formData.get("billing_city"),
        email: formData.get("billing_email"),
        postcode: formData.get("billing_postcode"),
        country: "BG",
        phone: formData.get("billing_phone"),
      },
      shipping_address: {
        first_name: formData.get("shipping_first_name") || formData.get("billing_first_name"),
        last_name: formData.get("shipping_last_name") || formData.get("billing_last_name"),
        address_1: formData.get("shipping_address_1") || formData.get("billing_address_1"),
        city: formData.get("shipping_city") || formData.get("billing_city"),
        country: "BG",
        postcode: formData.get("shipping_postcode") || formData.get("billing_postcode"),
      },
      customer_note:  companyDetails.company ? `Данни за фактура: \n Компания: ${companyDetails.company} \n ЕИК: ${companyDetails.company_tax_number} \n Град: ${companyDetails.company_city} \n Адрес: ${companyDetails.company_address} \n Държава: ${companyDetails.company_country} \n` : "",
      create_account: false,
      payment_method: "borica_3ds_mpi",
      // payment_data: [
      //   {
      //     key: "stripe_source",
      //     value: src.id,
      //   },
      //   {
      //     key: "billing_email",
      //     value: formData.get("billing_email")
      //   },
      //   {
      //     key: "billing_first_name",
      //     value: formData.get("billing_first_name")
      //   },
      //   {
      //     key: "billing_last_name",
      //     value: formData.get("billing_last_name")
      //   },
      //   {
      //     key: "paymentMethod",
      //     value: "stripe"
      //   },
      //   {
      //     key: "paymentRequestType",
      //     value: "cc"
      //   },
      //   {
      //     key: "wc-stripe-new-payment-method",
      //     value: true
      //   }
      // ]
    };

    //Validating the request data

    // const schema = z.object({
    //     code: z.string().refine(value => value !== undefined, {
    //         message: 'coupon code is required',
    //         path: ['code']
    //     }),
    // });

    // function validateForm(formData) {
    //     try {
    //         schema.parse(formData);
    //         return [];
    //     } catch (error) {
    //         return error.errors;
    //     }
    // }

    // const validationErrors = validateForm(cart);

    // if (validationErrors.length > 0) {
    //     return json({ errors: validationErrors }, { status: 422 });
    // }

    //Sending the request to the WP API

    const headers: any = { "Content-Type": "application/json" };

    cookies.getAll().forEach((cookie) => {
      headers[cookie.name] = cookie.value;
    });

    const responseOrder: any = await fetch(
      "https://shop.fragment.bg/wp-json/wc/store/v1/checkout",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(order),
      }
    );

    const data: any = await responseOrder.json();
    console.log(data)
    console.log(data.payment_result.payment_details)


    // if (data.status === "completed") {
    //   const removeItems = await fetch(
    //     "https://shop.fragment.bg/wp-json/wc/store/v1/cart/items",
    //     {
    //       method: "DELETE",
    //       headers: headers,
    //     }
    //   );
    // }

    const headerCookies: any = set_cookie_parser.parse(
      set_cookie_parser.splitCookiesString(
        responseOrder.headers.get("set-cookie")
      )
    );

    headerCookies.forEach((cookie: any) => {
      cookies.set(cookie.name, cookie.value, {
        path: cookie.path || "/",
        expires: cookie?.expires,
        maxAge: cookie?.maxAge || 60 * 60 * 24 * 7,
        secure: false,
        httpOnly: true,
      });
    });

    cookies.set("cart-token", responseOrder.headers.get("cart-token"), {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    });

    return { status: 200, data: data};
  },
};
