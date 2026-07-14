import type { ServerResponse } from "node:http";

import { applyCors, sendJson, type ApiRequest } from "../src/http.js";

export default function handler(request: ApiRequest, response: ServerResponse) {
  if (!applyCors(request, response)) return;

  if (request.method === "OPTIONS") {
    response.statusCode = 204;
    response.end();
    return;
  }

  if (request.method !== "GET") {
    response.setHeader("Allow", "GET, OPTIONS");
    sendJson(response, 405, { error: { code: "method_not_allowed", message: "Use GET." } });
    return;
  }

  sendJson(response, 200, { status: "ok", service: "aroc-lab-api" });
}
