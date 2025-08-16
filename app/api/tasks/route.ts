import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const taskSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(2).max(500),
});

export async function POST(req: Request): Promise<Response> {
  const body = await req.json();

  const result = taskSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(result.error, { status: 400 });
  }

  const { title, description } = result.data;

  const task = await prisma.task.create({
    data: {
      title,
      description,
    },
  });

  return NextResponse.json(task, { status: 201 });
}
