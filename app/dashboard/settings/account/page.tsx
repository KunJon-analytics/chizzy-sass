import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth";

export default async function UserPage() {
  const session = await auth.api.getSession({
    headers: headers(), // you need to pass the headers object.
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid max-w-sm gap-3">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="fullname">Full name</Label>
          <Input id="fullname" value={`${session.user.name}`} disabled />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={`${session.user.email}`}
            disabled
          />
        </div>
        {/* <div className="flex flex-wrap items-end gap-2">
          <div className="grid items-center gap-1.5">
            <Label htmlFor="avatar">Image</Label>
            <Input id="avatar" type="file" className="w-56" disabled />
          </div>
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={session.data.user?.photoUrl || undefined}
              alt={`${session.data.user?.name}`}
            />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </div> */}
      </div>
    </div>
  );
}
