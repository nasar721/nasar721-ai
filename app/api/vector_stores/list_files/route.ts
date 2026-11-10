import OpenAI from "openai";

export async function GET(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response("Server configuration error", { status: 500 });
    }

    const openai = new OpenAI({ apiKey });
    const { searchParams } = new URL(request.url);
    const vectorStoreId = searchParams.get("vector_store_id");
    const vectorStore = await openai.vectorStores.files.list(
      vectorStoreId || ""
    );
    return new Response(JSON.stringify(vectorStore), { status: 200 });
  } catch (error) {
    console.error("Error fetching files:", error);
    return new Response("Error fetching files", { status: 500 });
  }
}
