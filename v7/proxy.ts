import { authMemory } from "@/lib/initializer";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(_request: NextRequest) {
  await authMemory.initalize();

  return NextResponse.next();
}