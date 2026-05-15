"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Shield,
  Fingerprint,
  ChartNoAxesCombinedIcon,
  GitBranch,

} from "lucide-react";
import { useState } from "react";

const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  remember: Yup.boolean(),
});

type LoginType = {
  email: string;
  password: string;
  remember: boolean;
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(values);
      setIsLoading(false);
    },
  });

  return (
    <div className="min-h-screen bg-lineaer-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[50px_50px]" />
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-120 h-120 bg-cyan-500/10 rounded-full blur-[120px]"
        />
      </div>

      {/* Back to Home Button */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-slate-900/50 backdrop-blur-sm border border-slate-700 text-slate-300 text-sm hover:bg-slate-800/50 hover:border-blue-500/50 transition-all duration-300 group"
      >
        <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      {/* Main Login Card */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          {/* Header Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
         
          </motion.div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative group"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 to-purple-600 rounded-sm blur-sm opacity-20 group-hover:opacity-40 transition duration-500" />
            
            {/* Card Content */}
            <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-sm overflow-hidden">
              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-linear-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center border border-blue-500/20">
                    <Shield className="h-8 w-8 text-blue-400" />
                  </div>
                  <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
                  <p className="text-slate-400 text-sm">
                    Sign in to access your account
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-slate-300">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-slate-500" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full pl-9 pr-3 py-2.5 bg-slate-800/50 border rounded-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                          errors.email && touched.email
                            ? "border-red-500 focus:ring-red-500/20"
                            : "border-slate-700 focus:border-blue-500 focus:ring-blue-500/20"
                        }`}
                        placeholder="you@example.com"
                      />
                    </div>
                    {errors.email && touched.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-xs"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="password" className="text-sm font-medium text-slate-300">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-slate-500" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full pl-9 pr-10 py-2.5 bg-slate-800/50 border rounded-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                          errors.password && touched.password
                            ? "border-red-500 focus:ring-red-500/20"
                            : "border-slate-700 focus:border-blue-500 focus:ring-blue-500/20"
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && touched.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-xs"
                      >
                        {errors.password}
                      </motion.p>
                    )}
                  </div>

                  {/* Remember & Forgot */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="remember"
                          name="remember"
                          checked={values.remember}
                          onChange={(e) => setFieldValue("remember", e.target.checked)}
                          onBlur={handleBlur}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded border transition-all duration-200 flex items-center justify-center ${
                          values.remember
                            ? "bg-blue-500 border-blue-500"
                            : "border-slate-600 bg-slate-800/50 group-hover:border-slate-500"
                        }`}>
                          {values.remember && (
                            <CheckCircle className="h-3 w-3 text-white" />
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                        Remember me
                      </span>
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full relative group/btn"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 rounded-sm blur-md opacity-0 group-hover/btn:opacity-50 transition-opacity duration-300" />
                    <div className="relative flex items-center justify-center gap-2 w-full py-2.5 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-sm overflow-hidden transition-all duration-300">
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Authenticating...</span>
                        </div>
                      ) : (
                        <>
                          <Fingerprint className="h-4 w-4" />
                          <span>Sign In</span>
                        </>
                      )}
                    </div>
                  </motion.button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-700" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-slate-900 text-slate-500">Or continue with</span>
                    </div>
                  </div>

                  {/* Social Login */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 py-2 border border-slate-700 rounded-sm text-slate-300 hover:bg-slate-800/50 hover:border-slate-600 transition-all duration-200"
                    >
                      <span className="text-sm">GitHub</span>
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 py-2 border border-slate-700 rounded-sm text-slate-300 hover:bg-slate-800/50 hover:border-slate-600 transition-all duration-200"
                    >
                      <span className="text-sm">Google</span>
                    </motion.button>
                  </div>

                  {/* Sign Up Link */}
                  <p className="text-center text-sm text-slate-400 pt-4">
                    Don't have an account?{" "}
                    <Link
                      href="/signup"
                      className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                      Create account
                    </Link>
                  </p>
                </form>
              </div>

              {/* Decorative Bottom Bar */}
              <div className="h-1 bg-linear-to-r from-blue-500 via-purple-500 to-transparent" />
            </div>
          </motion.div>

          {/* Security Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-xs text-slate-500 mt-6"
          >
            Secured with end-to-end encryption
          </motion.p>
        </div>
      </div>
    </div>
  );
}