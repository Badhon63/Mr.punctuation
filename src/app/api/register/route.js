import {connectDB} from "@/lib/mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    const {email, password} = body;

    if (!email || !password) {
      return Response.json(
        {success: false, message: "Missing fields"},
        {status: 400},
      );
    }

    const db = await connectDB();

    // check existing user
    const existing = await db.collection("users").findOne({email});

    if (existing) {
      return Response.json(
        {success: false, message: "User already exists"},
        {status: 409},
      );
    }

    // save user
    await db.collection("users").insertOne({
      email,
      password,
      createdAt: new Date(),
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {success: false, message: "Server error"},
      {status: 500},
    );
  }
}
