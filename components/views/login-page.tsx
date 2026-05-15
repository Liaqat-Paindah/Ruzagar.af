"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  remember: Yup.boolean().required("Remember me is required"),
});

type LoginType = {
  email: string;
  password: string;
  remember: boolean;
};

export default function LoginPage() {
  const {
    errors,
    touched,
    isSubmitting,
    values,
    handleBlur,
    setFieldValue,
    handleChange,
    handleSubmit,
  } = useFormik<LoginType>({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },

    validationSchema: LoginSchema,

    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="pt-12 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Login Page</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>

          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border p-2 rounded"
          />

          {errors.email && touched.email && (
            <div className="text-red-500 text-sm mt-1">
              {errors.email}
            </div>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>

          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border p-2 rounded"
          />

          {errors.password && touched.password && (
            <div className="text-red-500 text-sm mt-1">
              {errors.password}
            </div>
          )}
        </div>

        {/* Remember */}
        <div className="flex items-center gap-2">
   <input
  type="checkbox"
  id="remember"
  name="remember"
  checked={values.remember}
  onChange={(e) => setFieldValue("remember", e.target.checked)}
  onBlur={handleBlur}
/>
          <label htmlFor="remember">Remember Me</label>
          {errors.remember=== undefined  || errors.remember=== null ? null : touched.remember && (
            <div className="text-red-500 text-sm mt-1">
              {errors.remember}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}