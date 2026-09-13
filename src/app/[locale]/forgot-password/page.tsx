import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";

import AuthLayout from "@/components/auth/auth-layout/AuthLayout";
import ForgotPasswordForm from "@/components/auth/forgot-password/ForgotPasswordForm";
import {authImages} from "@/data/auth";
import {localeFrom, pageMetadata} from "@/lib/seo";

type ForgotPasswordPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: ForgotPasswordPageProps): Promise<Metadata> {
  const {locale} = await params;

  return pageMetadata(
    localeFrom(locale),
    "forgot-password",
    "forgot-password"
  );
}

export default async function ForgotPasswordPage() {
  const t = await getTranslations("forgotPassword");

  return (
    <main>
      <AuthLayout
        image={authImages.forgotPassword}
        imageAlt={t("imageAlt")}
        imagePosition="left 18%"
      >
        <ForgotPasswordForm />
      </AuthLayout>
    </main>
  );
}