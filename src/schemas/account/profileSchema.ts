import {z} from 'zod';

export function createProfileSchema(
  locale: 'en' | 'ar'
) {
  const messages =
    locale === 'ar'
      ? {
          firstNameMin:
            'الاسم الأول يجب أن يكون حرفين على الأقل',

          lastNameMin:
            'اسم العائلة يجب أن يكون حرفين على الأقل',

          emailInvalid:
            'من فضلك أدخل بريدًا إلكترونيًا صحيحًا',

          addressMin:
            'العنوان يجب أن يكون 5 أحرف على الأقل',
        }
      : {
          firstNameMin:
            'First name must be at least 2 characters',

          lastNameMin:
            'Last name must be at least 2 characters',

          emailInvalid:
            'Please enter a valid email address',

          addressMin:
            'Address must be at least 5 characters',
        };

  return z.object({
    firstName: z
      .string()
      .min(2, messages.firstNameMin),

    lastName: z
      .string()
      .refine(
        (value) =>
          value.length === 0 || value.length >= 2,
        messages.lastNameMin
      ),

    email: z
  .string()
  .refine(
    (value) => {
      const isEmail =
        z.string().email().safeParse(value).success;

      const isPhone =
        /^\d{10,15}$/.test(value);

      return isEmail || isPhone;
    },
    messages.emailInvalid
  ),

    address: z
      .string()
      .min(5, messages.addressMin),
  });
}