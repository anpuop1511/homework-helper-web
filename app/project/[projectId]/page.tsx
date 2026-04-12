"use client";

import { useParams } from "next/navigation";
import DeepLinkRedirect from "@/app/components/DeepLinkRedirect";

export default function ProjectRoute() {
  const params = useParams();
  const projectId = params.projectId as string;

  return (
    <DeepLinkRedirect
      appScheme={`homeworkhelper://project/${projectId}`}
      title="Join Group Project"
      description="Opening the app to view or join this shared project..."
    />
  );
}