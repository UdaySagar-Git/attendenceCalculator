import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { db } from "@/libs/db";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.json("Unauthorized");

  const id = currentUser?.id;
  const body = await req.json();

  await db.user.update({
    where: { id: id },
    data: {
      classesData: body.classesData,
    },
  });

  const user = await db.user.findUnique({
    where: { id: id },
    select: {
      id: true,
      email: true,
      image: true,
      classesData: true,
    },
  });

  return NextResponse.json({ message: "Data updated", user, status: 200 });
}
