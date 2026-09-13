import {z} from 'zod';

export function createPasswordSchema(
  locale: 'en' | 'ar'
) {
  const messages =
    locale === 'ar'
      ? {
          currentPasswordRequired:
            'من فضلك أدخل كلمة المرور الحالية',

          newPasswordRequired:
            'من فضلك أدخل كلمة المرور الجديدة',

          passwordMin:
            'كلمة المرور يجب أن تكون 6 أحرف على الأقل',

          confirmPasswordRequired:
            'من فضلك أكد كلمة المرور الجديدة',

          passwordMismatch:
            'كلمتا المرور غير متطابقتين',
        }
      : {
          currentPasswordRequired:
            'Please enter your current password',

          newPasswordRequired:
            'Please enter your new password',

          passwordMin:
            'Password must be at least 6 characters',

          confirmPasswordRequired:
            'Please confirm your new password',

          passwordMismatch:
            'Passwords do not match',
        };

  return z
    .object({
      currentPassword: z
        .string()
        .min(1, messages.currentPasswordRequired),

      newPassword: z
        .string()
        .min(1, messages.newPasswordRequired)
        .min(6, messages.passwordMin),

      confirmPassword: z
        .string()
        .min(1, messages.confirmPasswordRequired),
    })
    .refine(
      (data) =>
        data.newPassword === data.confirmPassword,
      {
        message: messages.passwordMismatch,
        path: ['confirmPassword'],
      }
    );
}