import {z} from 'zod';

export function createCancellationSchema(
  locale: 'en' | 'ar'
) {
  const messages =
    locale === 'ar'
      ? {
          reasonRequired:
            'من فضلك اختر سبب الإلغاء',
        }
      : {
          reasonRequired:
            'Please select a cancellation reason',
        };

  return z.object({

    // دي الوحيده االلي بعمل عليها validation
    reason: z
      .string()
      .min(1, messages.reasonRequired),
  });
}