import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { RegistrationForm } from "components/ui/ui/RegistrationForm";
import { ROUTES } from "core/const/routes.enum";

export const meta: MetaFunction = () => {
  return [
    { title: "New Chat AI App" },
    { name: "description", content: "Welcome to Chat AI!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-3xl font-bold text-gray-800 dark:text-gray-100">
            Chat AI
          </h1>
        </header>
        <div className="flex sm:min-w-96 flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 px-5 py-6 sm:py-12 dark:border-gray-700">
          <div>
            <p className="font-semibold text-2xl">Welcome back</p>
            <p className="text-black/[0.6] text-sm mt-2">
              Enter your details below
            </p>
          </div>
          <RegistrationForm />
          <div className="mt-2">
            <p className="font-semibold text-base text-black/[0.6]">
              Already have an account?{" "}
              <Link
                to={ROUTES.HOME}
                className="text-gray-200 cursor-pointer hover:text-gray-700"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
