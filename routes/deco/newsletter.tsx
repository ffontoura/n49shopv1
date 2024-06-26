// TODO: Why not using actions?

import { Handlers } from "$fresh/server.ts";
import { PORTAL_SUBDOMAIN } from "deco-sites/australroupas/constants.ts";
// Add here the scripts you want to proxy

export const handler: Handlers = {
  POST: async (req) => {
    const SUBDOMAIN = PORTAL_SUBDOMAIN;

    const data = await req.json();
    const requestData = {
      email: data.email,
      firstName: data.firstName,
      isNewsletterOptIn: "true",
    };

    const response = await fetch(SUBDOMAIN + "/api/dataentities/CL/documents", {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        "content-type": "application/json",
        "accept": "application/json",
      },
    });

    const headers = new Headers(response.headers);
    headers.set("access-control-allow-origin", "*");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
