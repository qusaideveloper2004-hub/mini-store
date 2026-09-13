import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";

import AuthLayout from "@/components/auth/auth-layout/AuthLayout";
import SignupForm from "@/components/auth/signup/SignupForm";
import {authImages} from "@/data/auth";
import {localeFrom, pageMetadata} from "@/lib/seo";

type SignupPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: SignupPageProps): Promise<Metadata> {
  const {locale} = await params;

  return pageMetadata(localeFrom(locale), "signup", "signup");
}

export default async function SignupPage() {
  const t = await getTranslations("signup");

  return (
    <main>
      <AuthLayout
        image={authImages.signup}
        imageAlt={t("imageAlt")}
      >
        <SignupForm />
      </AuthLayout>
    </main>
  );
}