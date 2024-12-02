import { UserAuthForm } from "@/components/auth/user-auth-form";
import { searchParamsCache } from "../search-params";

export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
};

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { ref } = searchParamsCache.parse(searchParams);

  return <UserAuthForm />;
}
