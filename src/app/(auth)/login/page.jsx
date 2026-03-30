"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import lautech from "@/assets/lau.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@/assets/pngaaa.com-995389.png";
import { useLoginMutation } from "@/hooks/queries/useLoginMutation";



export default function login() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const loginMutation = useLoginMutation();

  async function handleLogin(e) {
    e.preventDefault();
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const matric = String(formData.get("matric") || "");
    const password = String(formData.get("password") || "");

    try {
      await loginMutation.mutateAsync({
        payload: { matric, password },
        queryParams: { source: "web" },
      });
      setMessage("✅ Login successful");
      router.push("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Login failed";
      setMessage(`❌ ${message}`);
      return;
    }
  }


  return (
    <div className="h-screen w-full flex flex-row">
      <div className="hidden md:block">
        <Image src={lautech} alt="lautech" className="h-screen" />
      </div>

      <div className="w-full flex justify-center items-center px-10">
        <div className="flex flex-col gap-10 w-full">
          <div className="flex justify-center items-center">
            <Image src={logo} width={100} height={100} alt="lautech logo" />
          </div>

          <div className="flex flex-col">
            <h1 className="text-accent font-bold font-lex text-[30px]">
              WELCOME TO <br />
              LAUTECH E~PORTAL
            </h1>
            <p className="font-regular text-[16px]">
              Enter Your Matriculation Number and Password to Continue.
            </p>
          </div>

          
          <form
            onSubmit={handleLogin}
            className="w-full flex flex-col gap-10"
          >
            <label>
              <p className="font-lex font-semibold pb-2">
                Matriculation Number
              </p>
              <Input
                type="text"
                name="matric"
                required
              />
            </label>

            <label>
              <div className="flex flex-row justify-between items-center pb-2">
                <p className="font-lex font-semibold">Password</p>
                <a className="text-accent font-semibold" href="#">
                  Forgot Password?
                </a>
              </div>
              <Input
                type="password"
                name="password"
                required
              />
            </label>

            {message && <p className="text-sm font-medium text-accent">{message}</p>}



            <Button disabled={loginMutation.isPending} className="bg-accent hover:bg-accent/90 text-white py-6 rounded-lg">
            {loginMutation.isPending ? "LOGGING IN..." : "LOGIN"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
