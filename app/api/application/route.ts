import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { data, error: jobsError } = await supabase
      .from("jobs")
      .select("*")
      .eq("userId", user.id)
      .order("created_at", { ascending: false });

    if (jobsError) {
      return NextResponse.json({ message: jobsError.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
