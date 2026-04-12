"use client";

import { useParams } from "next/navigation";
import DeepLinkRedirect from "@/app/components/DeepLinkRedirect";

export default function InviteRoute() {
  const params = useParams();
  const username = params.username as string;

  return (
    <DeepLinkRedirect
      appScheme={`homeworkhelper://invite/${username}`}
      title={`Friend Request from @${username}`}
      description="Opening the app to add this friend to your Social Quad..."
    />
  );
}