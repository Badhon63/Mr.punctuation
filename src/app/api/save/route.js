import { connectDB } from "@/lib/mongodb";
 
export async function POST(req) {
  try {
    const body = await req.json();
    const { originalText, correctedText } = body;
 
    if (!originalText || !correctedText) {
      return Response.json({ success: false, message: "Missing text" }, { status: 400 });
    }
 
    const db = await connectDB();
    const result = await db.collection("documents").insertOne({
      originalText,
      correctedText,
      createdAt: new Date(),
    });
 
    return Response.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error("Save error:", error);
    return Response.json({ success: false, message: "Server error" }, { status: 500 });
  }
}