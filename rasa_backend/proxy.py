import os
import asyncio
from aiohttp import web, ClientSession

TARGET = "http://127.0.0.1:5005"  # Rasa will run here

async def version(_req):
    return web.json_response({"ok": True})

async def proxy(request):
    # Forward everything else to Rasa
    async with ClientSession() as session:
        url = TARGET + request.rel_url.path_qs
        # copy headers except Host
        headers = {k: v for k, v in request.headers.items() if k.lower() != "host"}
        data = await request.read()
        async with session.request(request.method, url, headers=headers, data=data) as resp:
            body = await resp.read()
            # pass through status and headers
            proxied_headers = dict(resp.headers)
            return web.Response(status=resp.status, body=body, headers=proxied_headers)

app = web.Application()
app.router.add_get("/version", version)       # used by Render health check
app.router.add_route("*", "/{tail:.*}", proxy)  # everything else → Rasa

if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8000"))
    web.run_app(app, host="0.0.0.0", port=port)
