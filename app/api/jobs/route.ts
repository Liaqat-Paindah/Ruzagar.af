import { supabase } from "@/utils/supabase/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
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
    const description = getValue("description");
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

    const fileName = `${Date.now()}-${companyLogo.name}`;
    const { error: fileError } = await supabase.storage
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

    const { data: urlData } = supabase.storage
      .from("company-logos")
      .getPublicUrl(fileName);

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
    };

    const { data, error } = await supabase
      .from("jobs")
      .insert(jobPayload)
      .select()
      .single();

    if (error) {
      await supabase.storage.from("company-logos").remove([fileName]);

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
