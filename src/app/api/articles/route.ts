import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_BACKEND_ENDPOINT = "http://localhost:8000/api/v1/articles";

function resolveBackendUrl(requestUrl: string): string {
  const configured =
    process.env.IVY_ARTICLES_ENDPOINT ||
    process.env.NEXT_PUBLIC_IVY_ARTICLES_ENDPOINT ||
    DEFAULT_BACKEND_ENDPOINT;

  const trimmed = configured.trim().replace(/\/+$/, "");
  const base =
    trimmed.startsWith("http://") || trimmed.startsWith("https://")
      ? trimmed
      : DEFAULT_BACKEND_ENDPOINT;

  const target = new URL(base);
  const incoming = new URL(requestUrl);

  target.search = incoming.search;
  return target.toString();
}

export async function GET(request: Request) {
  const targetUrl = resolveBackendUrl(request.url);

  try {
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const body = await response.text();
    const contentType = response.headers.get("content-type") ?? "application/json";

    return new NextResponse(body, {
      status: response.status,
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch articles",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 502 }
    );
  }
}
