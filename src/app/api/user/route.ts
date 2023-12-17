import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { db } from "@/libs/db";
import * as z from "zod";

const userSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { username, email, password } = userSchema.parse(body);

    //checking if the username or email already exists
    const isEmailExists = await db.user.findUnique({
      where: { email: email },
    });

    if (isEmailExists) {
      return NextResponse.json(
        { user: null, message: "Email already exists" },
        { status: 409 }
      );
    }

    const isUsernameExists = await db.user.findFirst({
      where: { username: username },
    });
    if (isUsernameExists !== null) {
      return NextResponse.json(
        { user: null, message: "Username already exists" },
        { status: 409 }
      );
    }

    //hashing the password
    const hashedPassword = await hash(password, 10);

    //creating the user
    const user = await db.user.create({
      data: {
        username: username,
        email: email,
        UnhashedPassword: password,
        password: hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    //returning the user without the password

    const { password: _, UnhashedPassword: __, ...rest } = user;

    return NextResponse.json(
      { user: rest, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    // console.log("Error in creating user", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
