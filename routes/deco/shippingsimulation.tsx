// TODO: Why not using actions?

import { Handlers } from "$fresh/server.ts";
import { PORTAL_SUBDOMAIN } from "deco-sites/australroupas/constants.ts";
// Add here the scripts you want to proxy

export const handler: Handlers = {
  POST: async (req) => {
    const SUBDOMAIN = PORTAL_SUBDOMAIN;

    const data = await req.json();

    const id = req.url.split("=")[1];

    const response = await fetch(
      SUBDOMAIN + "/api/checkout/pub/orderForm/" + id +
        "/attachments/shippingData",
      {
        method: "POST",
        body: JSON.stringify(
          data,
        ),
        headers: {
          "content-type": "application/json",
          "accept": "application/json",
        },
      },
    );

    const headers = new Headers(response.headers);
    headers.set("access-control-allow-origin", "*");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
