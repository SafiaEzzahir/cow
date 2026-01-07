export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method === "POST" && url.pathname === "/image") {
      try {
        const body = await request.json().catch(() => ({}));
        const prompt = body.prompt;

        if (!prompt) {
          return new Response(JSON.stringify({ error: "No prompt provided in request body" }), {
            status: 400,
            headers: { 
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*" 
            },
          });
        }

        const binaryResponse = await env.AI.run(
          "@cf/stabilityai/stable-diffusion-xl-base-1.0",
          { prompt,
			size: "800x800" 
		   }
        );

        const arrayBuffer = await new Response(binaryResponse).arrayBuffer();
        
        const base64String = btoa(
          new Uint8Array(arrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );

        return new Response(
          JSON.stringify({ 
            image: `data:image/png;base64,${base64String}`,
            success: true 
          }),
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

      } catch (err) {
        console.error("Worker Error:", err.message);
        
        return new Response(
          JSON.stringify({ 
            error: "AI Generation Failed", 
            details: err.message 
          }),
          {
            status: 500,
            headers: { 
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*" 
            },
          }
        );
      }
    }

    return new Response("Not Found", { 
      status: 404,
      headers: { "Access-Control-Allow-Origin": "*" } 
    });
  },
};