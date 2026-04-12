"use client";

import { useParams } from "next/navigation";
import DeepLinkRedirect from "@/app/components/DeepLinkRedirect";

export default function ProfileRoute() {
  const params = useParams();
  const username = params.username as string;

  return (
    <DeepLinkRedirect
      appScheme={`homeworkhelper://profile/${username}`}
      title={`@${username}`}
      description="Redirecting you to view this profile in the Homework Helper app..."
    />
  );
}