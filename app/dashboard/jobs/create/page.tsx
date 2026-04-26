"use client";
import { useEffect, useState, type ChangeEvent } from "react";
import { useFormik } from "formik";
import {
  Loader2,
  X,
  Briefcase,
  MapPin,
  DollarSign,
  Users,
  Code,
  FileText,
  Calendar,
  Mail,
  AlertCircle,
  Award,
  CheckCircle2,
  Building2,
} from "lucide-react";
import Image from "next/image";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { usePostJobs } from "@/hooks/useJobs";
import { useAuth } from "@/components/provider/authContext";
import { JobFormValues } from "@/type/jobs";


const labelClassName = "mb-1.5 block text-sm font-medium text-foreground";
const fieldClassName =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/50";
const inputWithIconClassName = `${fieldClassName} pl-10`;
const iconClassName =
  "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground";
const dateIconClassName = "absolute left-3 top-3 h-4 w-4 text-muted-foreground";
const errorClassName = "mt-1 flex items-center gap-1 text-xs text-destructive";

const appendFormDataValue = (
  formData: FormData,
  key: keyof JobFormValues,
  value: JobFormValues[keyof JobFormValues],
) => {
  if (value === null || value === undefined) {
    return;
  }

  if (value instanceof File) {
    formData.append(key, value);
    return;
  }

  formData.append(key, String(value));
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  company: Yup.string().required("Company name is required"),
  location: Yup.string().required("Location is required"),
  salary: Yup.string().required("Salary is required"),
  vacancies: Yup.number()
    .min(1, "At least 1 vacancy")
    .required("Number of vacancies is required"),
  jobType: Yup.string().required("Job type is required"),
  gender: Yup.string().required("Gender is required"),
  skills: Yup.string().required("Skills are required"),
  description: Yup.string()
    .min(50, "Description must be at least 50 characters")
    .required("Description is required"),
  deadline: Yup.date()
    .min(new Date(), "Deadline must be in the future")
    .required("Deadline is required"),
  postedDate: Yup.date()
    .max(new Date(), "Posted date cannot be in the future")
    .required("Posted date is required"),
  contactEmail: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  remoteOption: Yup.string().required("Remote option is required"),
  status: Yup.string().required("Status is required"),
  companyLogo: Yup.mixed().required("Company logo is required"),
});

export default function CreateJobs() {
  const { user } = useAuth();
  const userId = user?.id || "";
  const { mutateAsync, isPending } = usePostJobs();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    values,
    setFieldValue,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    resetForm,
  } = useFormik<JobFormValues>({
    initialValues: {
      title: "",
      company: "",
      location: "",
      salary: "",
      vacancies: 1,
      jobType: "Full-time",
      gender: "Mid",
      skills: "",
      description: "",
      deadline: "",
      postedDate: new Date().toISOString().split("T")[0],
      contactEmail: "",
      remoteOption: "Onsite",
      status: "Open",
      companyLogo: null,
      userId: userId,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const formData = new FormData();
        (
          Object.entries(values) as [
            keyof JobFormValues,
            JobFormValues[keyof JobFormValues],
          ][]
        ).forEach(([key, value]) => {
          appendFormDataValue(formData, key, value);
        });

        await mutateAsync(formData);
        resetForm();
        setPreviewUrl(null);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (userId) {
      setFieldValue("userId", userId);
    }
  }, [setFieldValue, userId]);

  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      setFieldValue("companyLogo", file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeLogo = () => {
    setFieldValue("companyLogo", null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-1/4 top-0 h-96 w-96 rounded-full bg-linear-to-r from-primary/10 to-accent/40 blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-96 w-96 rounded-full bg-linear-to-r from-accent/40 to-primary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-3xl"
        >
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-foreground">
              Post a New Job
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill in the details below to create a job listing
            </p>
          </div>

          {/* Main Card */}
          <div className="relative overflow-hidden rounded-lg border border-border bg-card/80 backdrop-blur-sm">
            {/* Header with Icon */}
            <div className="relative border-b border-border p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="nexus-gradient flex h-10 w-10 items-center justify-center rounded-lg shadow-lg shadow-primary/20">
                      <Award className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="absolute inset-0 -z-10 rounded-lg bg-primary/30 blur-xl" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-foreground">
                      Job Information
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Provide comprehensive job details
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
              {/* Two-column layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className={labelClassName}>Job Title *</label>
                    <div className="relative">
                      <Briefcase className={iconClassName} />
                      <input
                        name="title"
                        type="text"
                        placeholder="e.g., Senior Frontend Developer"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputWithIconClassName}
                      />
                    </div>
                    <AnimatePresence>
                      {touched.title && errors.title && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={errorClassName}
                        >
                          <AlertCircle className="h-3 w-3" /> {errors.title}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className={labelClassName}>Company Name *</label>
                    <div className="relative">
                      <Building2 className={iconClassName} />
                      <input
                        name="company"
                        type="text"
                        placeholder="e.g., Google, Microsoft"
                        value={values.company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputWithIconClassName}
                      />
                    </div>
                    <AnimatePresence>
                      {touched.company && errors.company && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={errorClassName}
                        >
                          <AlertCircle className="h-3 w-3" /> {errors.company}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className={labelClassName}>Location *</label>
                    <div className="relative">
                      <MapPin className={iconClassName} />
                      <input
                        name="location"
                        type="text"
                        placeholder="e.g., New York, NY or Remote"
                        value={values.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputWithIconClassName}
                      />
                    </div>
                    <AnimatePresence>
                      {touched.location && errors.location && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={errorClassName}
                        >
                          <AlertCircle className="h-3 w-3" /> {errors.location}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className={labelClassName}>Salary *</label>
                    <div className="relative">
                      <DollarSign className={iconClassName} />
                      <input
                        name="salary"
                        type="text"
                        placeholder="e.g., $80,000 - $100,000"
                        value={values.salary}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputWithIconClassName}
                      />
                    </div>
                    <AnimatePresence>
                      {touched.salary && errors.salary && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={errorClassName}
                        >
                          <AlertCircle className="h-3 w-3" /> {errors.salary}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className={labelClassName}>Vacancies *</label>
                    <div className="relative">
                      <Users className={iconClassName} />
                      <input
                        type="number"
                        name="vacancies"
                        min="1"
                        value={values.vacancies}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputWithIconClassName}
                      />
                    </div>
                    <AnimatePresence>
                      {touched.vacancies && errors.vacancies && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={errorClassName}
                        >
                          <AlertCircle className="h-3 w-3" /> {errors.vacancies}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className={labelClassName}>Job Type *</label>
                    <select
                      name="jobType"
                      value={values.jobType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={fieldClassName}
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                      <option value="Temporary">Temporary</option>
                    </select>
                    <AnimatePresence>
                      {touched.jobType && errors.jobType && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={errorClassName}
                        >
                          <AlertCircle className="h-3 w-3" /> {errors.jobType}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className={labelClassName}>Gender *</label>
                    <select
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={fieldClassName}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                    <AnimatePresence>
                      {touched.gender && errors.gender && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={errorClassName}
                        >
                          <AlertCircle className="h-3 w-3" /> {errors.gender}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className={labelClassName}>
                      Skills (comma-separated) *
                    </label>
                    <div className="relative">
                      <Code className={iconClassName} />
                      <input
                        name="skills"
                        type="text"
                        placeholder="e.g., React, Node.js, Python, SQL"
                        value={values.skills}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputWithIconClassName}
                      />
                    </div>
                    <AnimatePresence>
                      {touched.skills && errors.skills && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={errorClassName}
                        >
                          <AlertCircle className="h-3 w-3" /> {errors.skills}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className={labelClassName}>Remote Option *</label>
                    <select
                      name="remoteOption"
                      value={values.remoteOption}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={fieldClassName}
                    >
                      <option value="Onsite">Onsite</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                    <AnimatePresence>
                      {touched.remoteOption && errors.remoteOption && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={errorClassName}
                        >
                          <AlertCircle className="h-3 w-3" />{" "}
                          {errors.remoteOption}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className={labelClassName}>Status *</label>
                    <select
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={fieldClassName}
                    >
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
                      <option value="Draft">Draft</option>
                    </select>
                    <AnimatePresence>
                      {touched.status && errors.status && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={errorClassName}
                        >
                          <AlertCircle className="h-3 w-3" /> {errors.status}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className={labelClassName}>Contact Email *</label>
                    <div className="relative">
                      <Mail className={iconClassName} />
                      <input
                        name="contactEmail"
                        type="email"
                        placeholder="hr@company.com"
                        value={values.contactEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputWithIconClassName}
                      />
                    </div>
                    <AnimatePresence>
                      {touched.contactEmail && errors.contactEmail && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={errorClassName}
                        >
                          <AlertCircle className="h-3 w-3" />{" "}
                          {errors.contactEmail}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className={labelClassName}>Deadline *</label>
                    <div className="relative">
                      <Calendar className={iconClassName} />
                      <input
                        type="date"
                        name="deadline"
                        value={values.deadline}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputWithIconClassName}
                      />
                    </div>
                    <AnimatePresence>
                      {touched.deadline && errors.deadline && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={errorClassName}
                        >
                          <AlertCircle className="h-3 w-3" /> {errors.deadline}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className={labelClassName}>Posted Date *</label>
                    <div className="relative">
                      <Calendar className={iconClassName} />
                      <input
                        type="date"
                        name="postedDate"
                        value={values.postedDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputWithIconClassName}
                      />
                    </div>
                    <AnimatePresence>
                      {touched.postedDate && errors.postedDate && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={errorClassName}
                        >
                          <AlertCircle className="h-3 w-3" />{" "}
                          {errors.postedDate}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Company Logo */}
              <div>
                <label className={labelClassName}>Company Logo *</label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    name="companyLogo"
                    accept="image/*"
                    onChange={handleLogoChange}
                    onBlur={handleBlur}
                    className="flex-1 rounded-lg border border-input bg-background text-sm text-foreground transition-all file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:text-primary-foreground hover:file:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  {previewUrl && (
                    <div className="relative shrink-0">
                      <Image
                        src={previewUrl}
                        alt="Company logo preview"
                        width={48}
                        height={48}
                        className="rounded-lg border border-border object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeLogo}
                        className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow-lg transition-opacity hover:opacity-90"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                </div>
                <AnimatePresence>
                  {touched.companyLogo && errors.companyLogo && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={errorClassName}
                    >
                      <AlertCircle className="h-3 w-3" /> {errors.companyLogo}
                    </motion.p>
                  )}
                </AnimatePresence>
                <p className="mt-1 text-xs text-muted-foreground">
                  Upload a company logo (max 5MB, PNG, JPG, or JPEG)
                </p>
              </div>

              {/* Job Description */}
              <div>
                <label className={labelClassName}>Job Description *</label>
                <div className="relative">
                  <FileText className={dateIconClassName} />
                  <textarea
                    name="description"
                    rows={6}
                    placeholder="Provide a detailed job description including responsibilities, requirements, benefits, etc. (minimum 50 characters)"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${fieldClassName} resize-y pl-10`}
                  />
                </div>
                <AnimatePresence>
                  {touched.description && errors.description && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={errorClassName}
                    >
                      <AlertCircle className="h-3 w-3" /> {errors.description}
                    </motion.p>
                  )}
                </AnimatePresence>
                <div className="mt-1 flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">
                    Minimum 50 characters
                  </p>
                  <p
                    className={`text-xs font-medium ${
                      values.description.length >= 50
                        ? "text-nexus-success"
                        : "text-muted-foreground"
                    }`}
                  >
                    {values.description.length}/50
                  </p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 border-t border-border pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isPending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="nexus-gradient flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting || isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin" size={16} />
                      Posting Job...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle2 size={16} />
                      Post Job
                    </span>
                  )}
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => {
                    resetForm();
                    removeLogo();
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 rounded-lg border border-border bg-secondary py-2.5 text-sm font-medium text-secondary-foreground transition-all hover:bg-accent"
                >
                  Clear Form
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
