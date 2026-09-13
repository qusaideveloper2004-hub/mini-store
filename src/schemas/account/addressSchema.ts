import {z} from 'zod';

export function createAddressSchema(
  locale: 'en' | 'ar'
) {
  const messages =
    locale === 'ar'
      ? {
          firstNameRequired:
            'من فضلك أدخل الاسم الأول',

          firstNameMin:
            'الاسم الأول يجب أن يكون حرفين على الأقل',

          lastNameRequired:
            'من فضلك أدخل اسم العائلة',

          lastNameMin:
            'اسم العائلة يجب أن يكون حرفين على الأقل',

          phoneRequired:
            'من فضلك أدخل رقم الهاتف',

          phoneInvalid:
            'من فضلك أدخل رقم هاتف صحيح',

          streetRequired:
            'من فضلك أدخل عنوان الشارع',

          streetMin:
            'العنوان يجب أن يكون 5 أحرف على الأقل',

          cityRequired:
            'من فضلك أدخل المدينة',

          cityMin:
            'اسم المدينة يجب أن يكون حرفين على الأقل',

          countryRequired:
            'من فضلك أدخل الدولة',

          countryMin:
            'اسم الدولة يجب أن يكون حرفين على الأقل',

          postalCodeRequired:
            'من فضلك أدخل الرمز البريدي',

          postalCodeInvalid:
            'من فضلك أدخل رمزًا بريديًا صحيحًا',
        }
      : {
          firstNameRequired:
            'Please enter your first name',

          firstNameMin:
            'First name must be at least 2 characters',

          lastNameRequired:
            'Please enter your last name',

          lastNameMin:
            'Last name must be at least 2 characters',

          phoneRequired:
            'Please enter your phone number',

          phoneInvalid:
            'Please enter a valid phone number',

          streetRequired:
            'Please enter your street address',

          streetMin:
            'Address must be at least 5 characters',

          cityRequired:
            'Please enter your city',

          cityMin:
            'City must be at least 2 characters',

          countryRequired:
            'Please enter your country',

          countryMin:
            'Country must be at least 2 characters',

          postalCodeRequired:
            'Please enter your postal code',

          postalCodeInvalid:
            'Please enter a valid postal code',
        };

  return z.object({
    firstName: z
      .string()
      .min(1, messages.firstNameRequired)
      .min(2, messages.firstNameMin),

    lastName: z
      .string()
      .min(1, messages.lastNameRequired)
      .min(2, messages.lastNameMin),

    phone: z
      .string()
      .min(1, messages.phoneRequired)
      .regex(
        /^\d{10,15}$/,
        messages.phoneInvalid
      ),

    street: z
      .string()
      .min(1, messages.streetRequired)
      .min(5, messages.streetMin),

    city: z
      .string()
      .min(1, messages.cityRequired)
      .min(2, messages.cityMin),

    country: z
      .string()
      .min(1, messages.countryRequired)
      .min(2, messages.countryMin),

    postalCode: z
      .string()
      .min(1, messages.postalCodeRequired)
      .regex(
        /^\d{3,10}$/,
        messages.postalCodeInvalid
      ),
  });
}