import {z} from 'zod';

export function createContactSchema(
  locale: 'en' | 'ar'
) {
  const messages =
    locale === 'ar'
      ? {
          nameRequired:
            'من فضلك أدخل اسمك',

          emailRequired:
            'من فضلك أدخل بريدك الإلكتروني',

          emailInvalid:
            'من فضلك أدخل بريدًا إلكترونيًا صحيحًا',

          messageRequired:
            'من فضلك اكتب رسالتك',

          messageMin:
            'الرسالة يجب أن تكون 10 أحرف على الأقل',
        }
      : {
          nameRequired:
            'Please enter your name',

          emailRequired:
            'Please enter your email',

          emailInvalid:
            'Please enter a valid email address',

          messageRequired:
            'Please enter your message',

          messageMin:
            'Message must be at least 10 characters',
        };

  return z.object({
    name: z
      .string()
      .min(1, messages.nameRequired),

    email: z
      .string()
      .min(1, messages.emailRequired)
      .email(messages.emailInvalid),

    message: z
      .string()
      .min(1, messages.messageRequired)
      .min(10, messages.messageMin),
  });
}