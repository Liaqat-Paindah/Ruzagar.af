import { supabaseAdmin } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import {
  extractPlainTextFromRichText,
  normalizeRichTextHtml,
} from "@/lib/rich-text";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      return NextResponse.json(
        {
          success: false,
          message: authError.message,
        },
        { status: 401 },
      );
    }

    const formData = await req.formData();
    const getValue = (key: string) => {
      const value = formData.get(key);
      return typeof value === "string" ? value.trim() : "";
    };

    const title = getValue("title");
    const company = getValue("company");
    const location = getValue("location");
    const salary = getValue("salary");
    const vacancies = Number(getValue("vacancies"));
    const jobType = getValue("jobType");
    const gender = getValue("gender");
    const skills = getValue("skills");
    const description = normalizeRichTextHtml(getValue("description"));
    const deadline = getValue("deadline");
    const postedDate = getValue("postedDate");
    const contactEmail = getValue("contactEmail");
    const remoteOption = getValue("remoteOption");
    const status = getValue("status");
    const userId = getValue("userId");
    const companyLogo = formData.get("companyLogo");

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User id is required",
        },
        { status: 400 },
      );
    }

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    if (user.id !== userId) {
      return NextResponse.json(
        {
          success: false,
          message: "You can only post jobs for your own account",
        },
        { status: 403 },
      );
    }

    if (!(companyLogo instanceof File) || companyLogo.size === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Company logo is required",
        },
        { status: 400 },
      );
    }

    if (!title || !company || !location || !jobType || !contactEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required job fields",
        },
        { status: 400 },
      );
    }

    if (!Number.isFinite(vacancies) || vacancies < 1) {
      return NextResponse.json(
        {
          success: false,
          message: "Vacancies must be a valid number greater than 0",
        },
        { status: 400 },
      );
    }

    if (extractPlainTextFromRichText(description).length < 50) {
      return NextResponse.json(
        {
          success: false,
          message: "Description must be at least 50 characters",
        },
        { status: 400 },
      );
    }

    const fileName = `${Date.now()}-${companyLogo.name}`;
    const { error: fileError } = await supabaseAdmin.storage
      .from("company-logos")
      .upload(fileName, companyLogo, {
        upsert: false,
      });

    if (fileError) {
      return NextResponse.json(
        {
          success: false,
          message: fileError.message,
        },
        { status: 500 },
      );
    }

    const { data: urlData } = supabaseAdmin.storage
      .from("company-logos")
      .getPublicUrl(fileName);
    const { data: profileData, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError || !profileData) {
      await supabaseAdmin.storage.from("company-logos").remove([fileName]);

      return NextResponse.json(
        {
          success: false,
          message: profileError?.message ?? "Profile not found",
        },
        { status: 400 },
      );
    }

    const jobPayload = {
      title,
      company,
      location,
      salary,
      vacancies,
      jobType,
      gender,
      skills,
      description,
      deadline,
      postedDate,
      contactEmail,
      remoteOption,
      status,
      companyLogo: urlData.publicUrl,
      userId,
      profile_id: profileData.id,
    };

    const { data, error } = await supabaseAdmin
      .from("jobs")
      .insert(jobPayload)
      .select()
      .single();

    if (error) {
      await supabaseAdmin.storage.from("company-logos").remove([fileName]);

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Job Posted Successfully...!",
        data,
      },
      { status: 201 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("jobs")
      .select(
        `
   *,
    profiles:profiles (
      id,
      email,
      first_name,
      last_name
    )
  `,
      )
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
          success: false,
          data: null,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message:
          data.length === 0 ? "No jobs found" : "Jobs fetched successfully",
        success: true,
        data,
      },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: "Internal server error",
        success: false,
        data: null,
      },
      { status: 500 },
    );
  }
}
