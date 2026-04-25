import { supabaseAdmin } from "@/utils/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, first_name, last_Name, phone, user_id } = body;

    if (!email || !first_name || !last_Name || !user_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 },
      );
    }

    const { error } = await supabaseAdmin.from("profiles").insert({
      id: user_id,
      email,
      first_name,
      last_name: last_Name,
      phone,
    });
    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 },
      );
    }
    return NextResponse.json({
      success: true,
      message: "Account created successfully!",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";

    return NextResponse.json(
      { success: false, message },
      { status: 500 },
    );
  }
}
