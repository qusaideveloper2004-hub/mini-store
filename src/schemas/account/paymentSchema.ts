import {z} from 'zod';

export function createPaymentSchema(
  locale: 'en' | 'ar'
) {
  const messages =
    locale === 'ar'
      ? {
          cardholderNameRequired:
            'من فضلك أدخل اسم حامل البطاقة',

          cardholderNameMin:
            'اسم حامل البطاقة يجب أن يكون حرفين على الأقل',

          cardNumberRequired:
            'من فضلك أدخل رقم البطاقة',

          cardNumberInvalid:
            'من فضلك أدخل رقم بطاقة صحيح',

          expiryMonthRequired:
            'من فضلك أدخل شهر الانتهاء',

          expiryMonthInvalid:
            'من فضلك أدخل شهرًا صحيحًا',

          expiryYearRequired:
            'من فضلك أدخل سنة الانتهاء',

          expiryYearInvalid:
            'من فضلك أدخل سنة صحيحة',

          cvvRequired:
            'من فضلك أدخل رمز الأمان',

          cvvInvalid:
            'من فضلك أدخل رمز أمان صحيح',
        }
      : {
          cardholderNameRequired:
            'Please enter the cardholder name',

          cardholderNameMin:
            'Cardholder name must be at least 2 characters',

          cardNumberRequired:
            'Please enter the card number',

          cardNumberInvalid:
            'Please enter a valid card number',

          expiryMonthRequired:
            'Please enter the expiry month',

          expiryMonthInvalid:
            'Please enter a valid expiry month',

          expiryYearRequired:
            'Please enter the expiry year',

          expiryYearInvalid:
            'Please enter a valid expiry year',

          cvvRequired:
            'Please enter the CVV',

          cvvInvalid:
            'Please enter a valid CVV',
        };

  return z.object({
    cardholderName: z
      .string()
      .min(1, messages.cardholderNameRequired)
      .min(2, messages.cardholderNameMin),

    cardNumber: z
      .string()
      .min(1, messages.cardNumberRequired)
      .regex(
        /^\d{16}$/,
        messages.cardNumberInvalid
      ),

    expiryMonth: z
      .string()
      .min(1, messages.expiryMonthRequired)
      .regex(
        /^(0[1-9]|1[0-2])$/,
        messages.expiryMonthInvalid
      ),

    expiryYear: z
      .string()
      .min(1, messages.expiryYearRequired)
      .regex(
        /^\d{4}$/,
        messages.expiryYearInvalid
      ),

    cvv: z
      .string()
      .min(1, messages.cvvRequired)
      .regex(
        /^\d{3,4}$/,
        messages.cvvInvalid
      ),
  });
}