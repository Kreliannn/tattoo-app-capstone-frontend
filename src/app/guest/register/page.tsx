"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useUserStore from "@/app/store/useUserStore";
import axiosInstance from "@/app/utils/axios";
import { errorAlert, successAlert } from "@/app/utils/alert";
import { LoaderCircle, User, Lock, Eye, EyeOff , PhoneIncoming, Sparkles} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { accountInterfaceInput } from "@/app/types/accounts.type";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false)


  const mutation = useMutation({
    mutationFn: (data: accountInterfaceInput) =>
      axiosInstance.post("/auth/register", data),
    onSuccess: (res) => {
      successAlert("account registered")
      setIsLoading(false)
      setName("")
      setUsername("")
      setPassword("")
      setConfirmPassword("")
      setContact("")
    },
    onError : (err : { request : { response : string }}) => {
      console.log(err)
      errorAlert(err.request.response)
      setIsLoading(false)
    }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if(!name ||  !username || !password || !contact) return errorAlert("empty field")

    if(password != confirmPassword) return errorAlert("confirm password not match")

    const profile = "/default_profile.jpg"

    mutation.mutate({
      name,
      type : "client",
      username,
      password,
      contact,
      profile,
      location : null
    });

    setIsLoading(true)

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-stone-50 px-4 sm:px-6 lg:px-8 mt-10">

   

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 shadow-lg bg-white rounded-lg overflow-hidden">
        {/* Left: Logo Image */}
        <div className="relative bg-gray-100 p-0 h-full w-full">
          <img
            src="/web/img3.jpg"
            alt="Logo"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        {/* Right: Login Form */}
        <div className="flex flex-col justify-center p-10 ">

       
        
          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">

            <h1 className="font-bold text-3xl text-stone-700"> Sign Up </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-stone-800 uppercase tracking-wide">
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                    className="block w-full pl-10 py-3 border-0 border-b-2 border-gray-200 bg-transparent focus:border-stone-600 text-sm"
                  />
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-stone-800 uppercase tracking-wide">
                  Contact
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PhoneIncoming className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Enter contact"
                    className="block w-full pl-10 py-3 border-0 border-b-2 border-gray-200 bg-transparent focus:border-stone-600 text-sm"
                  />
                </div>
              </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {/* Username Field */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-stone-800 uppercase tracking-wide">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                    className="block w-full pl-10 pr-3 py-3 border-0 border-b-2 border-gray-200 bg-transparent placeholder-gray-400 focus:outline-none focus:border-stone-600 focus:ring-0 transition-colors duration-200 text-sm"
                  />
                </div>
              </div>

         
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">         
              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-stone-800 uppercase tracking-wide">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    className="block w-full pl-10 pr-10 py-3 border-0 border-b-2 border-gray-200 bg-transparent placeholder-gray-400 focus:outline-none focus:border-stone-600  focus:ring-0 transition-colors duration-200 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400 hover:text-stone-800  transition-colors" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400 hover:text-stone-800  transition-colors" />
                    )}
                  </button>
                </div>
              </div>


              <div className="space-y-2">
                <label className="block text-xs font-medium text-stone-800 uppercase tracking-wide">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    required
                    className="block w-full pl-10 pr-10 py-3 border-0 border-b-2 border-gray-200 bg-transparent placeholder-gray-400 focus:outline-none focus:border-stone-600  focus:ring-0 transition-colors duration-200 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400 hover:text-stone-800  transition-colors" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400 hover:text-stone-800  transition-colors" />
                    )}
                  </button>
                </div>
              </div>

            </div>


            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-stone-700 to-stone-800 text-white py-3 px-4 text-sm font-medium hover:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[0.98] active:scale-95"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    <span>creating account...</span>
                  </div>
                ) : (
                  "Sign up"
                )}
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <div className="h-px bg-gray-200 w-full mb-4"></div>
            <Link className="text-xs text-gray-700 font-bold" href={"/guest/login"}>
             Sign in?
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}