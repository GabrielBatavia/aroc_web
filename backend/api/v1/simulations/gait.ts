import type { ServerResponse } from "node:http";

import { simulateGait, validateGaitSimulationInput } from "../../../src/gait.js";
import { applyCors, readJsonBody, sendJson, type ApiRequest } from "../../../src/http.js";

export default async function handler(request: ApiRequest, response: ServerResponse) {
  if (!applyCors(request, response)) return;

  if (request.method === "OPTIONS") {
    response.statusCode = 204;
    response.end();
    return;
  }

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST, OPTIONS");
    sendJson(response, 405, { error: { code: "method_not_allowed", message: "Use POST." } });
    return;
  }

  try {
    const body = await readJsonBody(request);
    const parsed = validateGaitSimulationInput(body);

    if (!parsed.ok) {
      sendJson(response, 400, {
        error: {
          code: "invalid_parameters",
          message: "One or more simulation parameters are invalid.",
          details: parsed.errors,
        },
      });
      return;
    }

    sendJson(response, 200, simulateGait(parsed.value));
  } catch (error) {
    const code = error instanceof Error && error.message === "request_body_too_large" ? "request_body_too_large" : "invalid_json";
    const status = code === "request_body_too_large" ? 413 : 400;
    sendJson(response, status, { error: { code, message: "Request body must contain valid JSON." } });
  }
}
