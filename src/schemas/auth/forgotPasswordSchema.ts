import {z} from 'zod';

export function createForgotPasswordSchema(
  locale: 'en' | 'ar'
) {
  const messages =
    locale === 'ar'
      ? {
          required:
            'من فضلك أدخل البريد الإلكتروني أو رقم الهاتف',

          invalid:
            'من فضلك أدخل بريدًا إلكترونيًا أو رقم هاتف صحيح',
        }
      : {
          required:
            'Please enter your email or phone number',

          invalid:
            'Please enter a valid email or phone number',
        };

  return z.object({
    emailOrPhone: z
      .string()
      .min(1, messages.required)
      .refine(
        (value) => {
          const isEmail =
            z.string().email().safeParse(value).success;

          const isPhone =
            /^\d{10,15}$/.test(value);

          return isEmail || isPhone;
        },
        messages.invalid
      ),
  });
}