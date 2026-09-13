import {z} from 'zod';

export function createLoginSchema(
  locale: 'en' | 'ar'
) {
  const messages =
    locale === 'ar'
      ? {
          emailOrPhoneRequired:
            'من فضلك أدخل البريد الإلكتروني أو رقم الهاتف',

          emailOrPhoneInvalid:
            'من فضلك أدخل بريدًا إلكترونيًا أو رقم هاتف صحيح',

          passwordRequired:
            'من فضلك أدخل كلمة المرور',

          passwordMin:
            'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
        }
      : {
          emailOrPhoneRequired:
            'Please enter your email or phone number',

          emailOrPhoneInvalid:
            'Please enter a valid email or phone number',

          passwordRequired:
            'Please enter your password',

          passwordMin:
            'Password must be at least 6 characters',
        };

  return z.object({
    emailOrPhone: z
      .string()
      .min(1, messages.emailOrPhoneRequired)
      .refine(
        (value) => {
          const isEmail =
            z.string().email().safeParse(value).success;

          const isPhone =
            /^\d{10,15}$/.test(value);

          return isEmail || isPhone;
        },
        messages.emailOrPhoneInvalid
      ),

    password: z
      .string()
      .min(1, messages.passwordRequired)
      .min(6, messages.passwordMin),
  });
}