"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "@/apis/contact.api";
import { ContactMessage } from "@/lib/types";

interface ContactCardProps {
  companyEmail?: string;
  onSuccess?: () => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  companyEmail,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<ContactMessage>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      });
      onSuccess?.();
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    mutation.mutate(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Us a Message</CardTitle>
      </CardHeader>
      <CardContent>
        {mutation.isSuccess ? (
          <div className="flex flex-col items-center text-center space-y-4 py-6">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
            <p className="text-lg font-medium">Message sent successfully!</p>
            <Button onClick={() => mutation.reset()} variant="outline">
              Send Another
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="Abebe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Tesfaye"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="abebe.tesfaye@gmail.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="company">Company (Optional)</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your Company Name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Vehicle Import Inquiry"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Hello Kiswah Trading, I am interested in importing vehicles from China..."
                rows={5}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {mutation.isPending ? "Sending..." : "Send Message"}
            </Button>

            {mutation.isError && (
              <div className="flex items-center space-x-2 text-red-500 mt-2">
                <XCircle className="h-5 w-5" />
                <p>{(mutation.error as Error)?.message}</p>
              </div>
            )}
          </form>
        )}
      </CardContent>
    </Card>
  );
};
