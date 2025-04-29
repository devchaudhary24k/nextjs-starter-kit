"use client";

// ADDED: Import loader icon
import { type HTMLAttributes } from "react";

// import { Icons } from "@components/icons/icons";
// import { Button } from "@components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@components/ui/form";
// import { Input } from "@components/ui/input";
// import { Loader2 } from "lucide-react";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { SessionList } from "@/types/auth";

// import ProfileImageDialog from "./profile-image-dialog";

type SecuritySettingsFormType = {
  sessionList: SessionList;
} & HTMLAttributes<HTMLDivElement>;

/**
 * AccountSettingsForm Component
 *
 * A comprehensive form for managing user account settings including name, email,
 * and profile picture with validation and responsive design.
 */
const SecuritySettingsForm = ({
  className,
  sessionList,
  ...props
}: SecuritySettingsFormType) => {
  // // IMPROVED: Added feedback with toast
  // const onSubmitUserAccountSettings = async (
  //   values: z.infer<typeof AccountSettingsSchema>,
  // ) => {
  // };

  function detectOS(userAgent) {
    userAgent = userAgent.toLowerCase();

    const osMap = {
      "windows nt": "Windows",
      iphone: "iPhone/iOS",
      ipad: "iPhone/iOS",
      ipod: "iPhone/iOS",
      android: "Android",
      "mac os x": "Mac",
      linux: "Linux",
    };

    const browserMap = {
      chrome: "Chrome",
      firefox: "Firefox",
      safari: "Safari",
      edg: "Edge",
      opera: "Opera",
    };

    const osMatch = Object.entries(osMap).find(([key]) =>
      userAgent.includes(key),
    );
    const browserMatch = Object.entries(browserMap).find(([key]) =>
      userAgent.includes(key),
    );

    return {
      os: osMatch ? osMatch[1] : "❓ Unknown OS",
      browser: browserMatch ? browserMatch[1] : "❓ Unknown Browser",
      label: `${osMatch ? osMatch[1] : "❓"} | ${browserMatch ? browserMatch[1] : "❓"}`,
    };
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* IMPROVED: Responsive grid layout */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
        {/* Section Description */}
        <div className="col-span-1 md:col-span-2">
          <div className="text-lg font-medium">Active Session</div>
          <div className="text-muted-foreground mt-1 text-sm">
            Manage your active sessions across different devices.
          </div>
        </div>

        {/* Form Inputs */}
        <div className="col-span-1 md:col-span-4 lg:col-span-3">
          {sessionList.map((session, idx) => {
            const os = detectOS(session.userAgent);

            return (
              <div key={idx}>
                <div className="space-y-2 rounded-xl p-4 shadow-md">
                  <h2 className="text-xl font-semibold">Session Info</h2>
                  <div>
                    <strong>Session ID:</strong> {session.id}
                  </div>
                  <div>
                    <strong>User ID:</strong> {session.userId}
                  </div>
                  <div>
                    <strong>Agent</strong>
                    {session.userAgent}
                  </div>

                  <div>
                    <strong>Updated At:</strong>{" "}
                    {new Date(session.updatedAt).toLocaleString()}
                  </div>
                  {JSON.stringify(os)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SecuritySettingsForm;
