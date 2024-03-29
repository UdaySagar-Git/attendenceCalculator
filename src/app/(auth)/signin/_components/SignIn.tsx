"use client"

import { signIn } from "next-auth/react";
import SigninWithGoogle from "@/components/SigninWithGoogle";
import { toast } from "react-hot-toast";
import { FieldValues, useForm } from "react-hook-form";

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await signIn('credentials', {
        email: data.email.toLowerCase(),
        password: data.password,
        redirect: false,
        // callbackUrl: '/'
      });

      if (response?.ok) {
        toast.success("Signin successful");
        // router.refresh()
        // router.push('/');
        window.location.href = '/';
      }

      if (response?.error) {
        toast.error("Signin failed");
      }
      // console.log(response);
    } catch (error: any) {
      // Handle error
      toast.error(error.message);
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 px-2 py-1 rounded-lg"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 px-2 py-1 rounded-lg"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && <p className="text-red-500">Password must have more than 8 characters</p>}
          <button
            type="submit"
            className="bg-gray-950 hover:bg-gray-800 text-white text-sm font-semibold py-2 px-3 rounded-lg"
          >
            Sign In
          </button>
        </div>
        <SigninWithGoogle />

        {/* <p className="text-center mt-4">
          Don&apos;t have an account? <Link href="/signup" className="text-blue-500">Sign Up</Link>
        </p> */}
      </form>
    </div>
  );
};

export default SignIn;
