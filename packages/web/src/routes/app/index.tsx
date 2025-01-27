import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getSession, useSession } from "@/lib/auth";
import { sessionStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { redirect, useNavigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { addDays, format, subDays } from "date-fns";

import { useState } from "react";

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
  beforeLoad: async ({ context: { api } }) => {
    const session = await getSession();
    if (!session) {
      throw redirect({ to: "/signin", search: { email: undefined } });
    }
  },
});

function RouteComponent() {
  const { data: sesh, isPending } = useSession();

  const { api, qc } = Route.useRouteContext();

  const navigate = useNavigate({ from: Route.fullPath });
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);
  const navigateDate = (direction: "forward" | "backward") => {
    const newDate =
      direction === "forward" ? addDays(date, 1) : subDays(date, 1);
    setDate(newDate);
  };
  if (!sesh && !isPending)
    navigate({
      to: "/signin",
      search: {
        email: undefined,
      },
    });

  return <div>yo {sesh?.user.name} </div>;
}
