"use client";
import React, { useState } from "react";
import Image from "next/image";
import lautech from "@/asset/lau.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@/asset/logo.png";
import { useRouter } from "next/navigation";


export default function login() {
  const [matric, setMatric] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();


  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matric,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
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
            <Image src={logo} alt="lautech logo" />
          </div>

          <div className="flex flex-col">
            <h1 className="text-primary font-bold font-lex text-[30px]">
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
                value={matric}
                onChange={(e) => setMatric(e.target.value)}
                required
              />
            </label>

            <label>
              <div className="flex flex-row justify-between items-center pb-2">
                <p className="font-lex font-semibold">Password</p>
                <a className="text-blue-700 font-semibold" href="#">
                  Forgot Password?
                </a>
              </div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            {error && (
              <p className="text-red-600 font-semibold">{error}</p>
            )}

            <Button disabled={loading}>
              {loading ? "Logging in..." : "LOGIN"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
