import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";

import LoginForm from "@/components/auth/login/LoginForm";
import AuthLayout from "@/components/auth/auth-layout/AuthLayout";
import {authImages} from "@/data/auth";
import {localeFrom, pageMetadata} from "@/lib/seo";

type LoginPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: LoginPageProps): Promise<Metadata> {
  const {locale} = await params;

  return pageMetadata(localeFrom(locale), "login", "login");
}

export default async function LoginPage() {
  const t = await getTranslations("login");

  return (
    <main>
      <AuthLayout
        image={authImages.login}
        imageAlt={t("imageAlt")}
      >
        <LoginForm />
      </AuthLayout>
    </main>
  );
}