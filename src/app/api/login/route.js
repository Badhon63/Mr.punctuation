import { connectDB } from "@/lib/mongodb";
 
export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;
 
    if (!email || !password) {
      return Response.json({ success: false, message: "Missing fields" }, { status: 400 });
    }
 
    const db = await connectDB();
    const user = await db.collection("users").findOne({ email, password });
    // ⚠️ In production, use bcrypt to hash/compare passwords instead of plain text
 
    if (user) {
      return Response.json({ success: true, user: { email: user.email } });
    }
 
    return Response.json({ success: false, message: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ success: false, message: "Server error" }, { status: 500 });
  }
}