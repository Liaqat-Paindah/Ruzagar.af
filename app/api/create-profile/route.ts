import { supabase } from "@/utils/supabase/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, first_name, last_Name, phone, user_id } = body;
    const { error } = await supabase.from("profiles").insert({
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
          message: "Something is wrong!",
        },
        { status: 500 },
      );
    }
    return NextResponse.json({
      success: true,
      message: "Account created successfully!",
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
