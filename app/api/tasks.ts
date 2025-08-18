import { NextRequest, NextResponse } from "next/server";

type NewTask = {
  title: string;
  description?: string;
  completed?: boolean;
  dueDate?: string; // ISO 8601
  [key: string]: unknown;
};

type Task = NewTask & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

function makeId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `t_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json(
      { error: "Content-Type must be application/json" },
      { status: 415 }
    );
  }

  let payload: NewTask;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof payload !== "object" || payload === null) {
    return NextResponse.json(
      { error: "Body must be a JSON object" },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();
  const task: Task = {
    id: makeId(),
    title: (payload.title as string).trim(),
    description:
      typeof payload.description === "string" ? payload.description : undefined,
    completed:
      typeof payload.completed === "boolean" ? payload.completed : false,
    dueDate: typeof payload.dueDate === "string" ? payload.dueDate : undefined,
    createdAt: now,
    updatedAt: now,
  };

  return NextResponse.json(task, {
    status: 201,
    headers: { Location: `/api/tasks/${task.id}` },
  });
}
