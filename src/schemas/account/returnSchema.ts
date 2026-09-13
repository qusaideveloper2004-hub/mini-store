import {z} from 'zod';

export function createReturnSchema(
  locale: 'en' | 'ar'
) {
  const messages =
    locale === 'ar'
      ? {
          productRequired:
            'من فضلك اختر المنتج',

          quantityRequired:
            'من فضلك أدخل الكمية',

          quantityInvalid:
            'الكمية يجب أن تكون أكبر من صفر',

          reasonRequired:
            'من فضلك اختر سبب الإرجاع',
        }
      : {
          productRequired:
            'Please select a product',

          quantityRequired:
            'Please enter the quantity',

          quantityInvalid:
            'Quantity must be greater than zero',

          reasonRequired:
            'Please select a return reason',
        };

  return z.object({
    productId: z
      .number({
        message: messages.productRequired,
      }),

    quantity: z
      .number({
        message: messages.quantityRequired,
      })
      .int()
      .positive(messages.quantityInvalid),

    reason: z
      .string()
      .min(1, messages.reasonRequired),
  });
}