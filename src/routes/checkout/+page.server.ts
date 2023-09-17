import * as set_cookie_parser from "set-cookie-parser";
import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import { cartStore } from "$lib/store/store";
import { redirect } from "@sveltejs/kit";

export const load = async ({ fetch, cookies }) => {
  
  const headers: any = { "Content-Type": "application/json" };

  cookies.getAll().forEach((cookie) => {
    headers[cookie.name] = cookie.value;
  });

  const res: any = await fetch(`${PUBLIC_API_ENDPOINT}/checkout`, {
    method: "GET",
    headers: headers,
  });

  const resCart: any = await fetch(`${PUBLIC_API_ENDPOINT}/cart`, {
    method: "GET",
    headers: headers,
  });

  const data = await res.json();
  return {
    cart: resCart.json(),
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
      },
    },
    paymentMethods: [
      {
        id: "cod",
        label: "Наложен платеж",
        text: "Плащането се извършва в брой или с карта при получаване на продукта.",
        available: true,
      },
      {
        id: "alg_custom_gateway_1",
        label: "Плащане с карта",
        text: "Плащане с дебитна или кредитна карта посредством Stripe.",
        available: true,
      },
    ]
  };
};



export const actions = {
  default: async ({ cookies, fetch, request }) => {
    const formData = await request.formData();

    let companyDetails = {
      company: formData.get("company_name"),
      company_tax_number: formData.get("company_tax_number"),
      company_city: formData.get("company_city"),
      company_address: formData.get("company_address"),
      company_country: formData.get("company_country"),
    };

    // const order = {
    //   billing_address: {
    //     first_name: formData.get("billing_first_name"),
    //     last_name: formData.get("billing_last_name"),
    //     address_1: formData.get("billing_address_1"),
    //     address_2: formData.get("payment_id") ? "Stripe ID: "+formData.get("payment_id") : "",
    //     city: formData.get("billing_city"),
    //     email: formData.get("billing_email"),
    //     postcode: "0000",
    //     country: "BG",
    //     phone: formData.get("billing_phone"),
    //   },
    //   shipping_address: {
    //     first_name: formData.get("billing_first_name"),
    //     last_name: formData.get("billing_last_name"),
    //     address_1: formData.get("billing_address_1"),
    //     city: formData.get("billing_city"),
    //     country: "BG",
    //     postcode: "1000",
    //   },
    //   customer_note: (companyDetails.company
    //     ? `Данни за фактура: \n Компания: ${companyDetails.company} \n ЕИК: ${companyDetails.company_tax_number} \n Град: ${companyDetails.company_city} \n Адрес: ${companyDetails.company_address} \n Държава: ${companyDetails.company_country} \n`
    //     : "") +"\n"+"Бележка от клиента: "+formData.get("customer_note"),
    //   create_account: false,
    //   payment_method: formData.get("payment_method"),
    // };

    const order = {
      billing_address: {
        first_name: formData.get("billing_first_name"),
        last_name: formData.get("billing_last_name"),
        address_1: formData.get("billing_address_1"),
        address_2: formData.get("payment_id") ? "Stripe ID: "+formData.get("payment_id") : "",
        city: formData.get("billing_city"),
        email: formData.get("billing_email"),
        postcode: "0000",
        country: "BG",
        phone: formData.get("billing_phone"),
      },
      shipping_address: {
        first_name: formData.get("billing_first_name"),
        last_name: formData.get("billing_last_name"),
        address_1: formData.get("billing_address_1"),
        city: formData.get("billing_city"),
        country: "BG",
        postcode: "1000",
      },
      customer_note: (companyDetails.company
        ? `Данни за фактура: \n Компания: ${companyDetails.company} \n ЕИК: ${companyDetails.company_tax_number} \n Град: ${companyDetails.company_city} \n Адрес: ${companyDetails.company_address} \n Държава: ${companyDetails.company_country} \n`
        : "") +"\n"+"Бележка от клиента: "+formData.get("customer_note"),
      create_account: false,
      payment_method: "cod",
    };

    const onSuccessDate = {
      first_name: formData.get("billing_first_name"),
      last_name: formData.get("billing_last_name"),
      email: formData.get("billing_email"),
      paymentMethod: formData.get("payment_method"),
    }

    const headers: any = { 'Content-Type': 'application/json' };

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

    let url = `/checkout/success?first_name=${onSuccessDate.first_name}&last_name=${onSuccessDate.last_name}&order_id=${data.order_id}&email=${onSuccessDate.email}&payment_method=${onSuccessDate.paymentMethod}`

    if(data.status == "completed" || data.status == "processing"){
      cartStore.set([])
      throw redirect(301, url)
    }

    if (data.status === "completed") {
      const removeItems = await fetch(
        "https://shop.fragment.bg/wp-json/wc/store/v1/cart/items",
        {
          method: "DELETE",
          headers: headers,
        }
      );
    }
    
    const headerCookies: any = set_cookie_parser.parse(
      set_cookie_parser.splitCookiesString(
        responseOrder.headers.get("set-cookie")
      )
    );

    headerCookies.forEach((cookie) => {
      cookies.set(cookie.name, cookie.value, {
          domain: cookie?.domain,
          path: cookie?.path,
          expires: cookie?.expires,
          maxAge: cookie?.maxAge || 60 * 60 * 24 * 7,
          secure: false,
          httpOnly: true
      })
  })

  //   cookies.set("cart-token", responseOrder.headers.get("cart-token"), {
  //     path: "/",
  //     maxAge: 60 * 60 * 24 * 7,
  //     secure: false,
  //     httpOnly: true,
  //     sameSite: "lax",
  //   });

    return { status: 200};
  },
};
