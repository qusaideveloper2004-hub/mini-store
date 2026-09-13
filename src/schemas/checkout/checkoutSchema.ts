import {z} from 'zod';

export function createCheckoutSchema(
  locale: 'en' | 'ar'
) {
  const messages =
    locale === 'ar'
      ? {
          nameMin: 'الاسم يجب أن يكون حرفين على الأقل',
          emailInvalid: 'من فضلك أدخل بريدًا إلكترونيًا صحيحًا',
          phoneInvalid: 'من فضلك أدخل رقم هاتف صحيح',
          addressMin: 'العنوان قصير جدًا',
          cityMin: 'المدينة مطلوبة',
        }
      : {
          nameMin: 'Name must be at least 2 characters',
          emailInvalid: 'Please enter a valid email',
          phoneInvalid: 'Please enter a valid phone number',
          addressMin: 'Address is too short',
          cityMin: 'City is required',
        };

  return z.object({
    name: z
      .string()
      .min(2, messages.nameMin),

    email: z
      .string()
      .email(messages.emailInvalid),

    phone: z
      .string()
      .min(10, messages.phoneInvalid),

    address: z
      .string()
      .min(5, messages.addressMin),

    city: z
      .string()
      .min(2, messages.cityMin),

    paymentMethod: z.enum(['bank', 'cash']),
  });
}
