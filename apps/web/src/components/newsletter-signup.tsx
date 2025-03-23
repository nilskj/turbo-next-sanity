"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";

interface NewsletterSignupProps {
  heading: string;
  subheading?: string;
  buttonText: string;
  placeholder: string;
  successMessage: string;
}

export function NewsletterSignup({
  heading,
  subheading,
  buttonText,
  placeholder,
  successMessage,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Call your newsletter API endpoint
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Subscription failed");
      }

      setIsSuccess(true);
      setEmail("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="newsletter-signup w-full space-y-4">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{heading}</h3>
        {subheading && <p className="text-sm text-gray-500">{subheading}</p>}
      </div>

      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              className="flex-grow"
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Subscribing..." : buttonText}
            </Button>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
      ) : (
        <p className="text-sm text-green-600 font-medium">{successMessage}</p>
      )}
    </div>
  );
}
