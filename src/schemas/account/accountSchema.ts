import {z} from 'zod';

import {createProfileSchema} from './profileSchema';
import {createPasswordSchema} from './passwordSchema';

export function createAccountSchema(
  locale: 'en' | 'ar'
) {
  const profileSchema =
    createProfileSchema(locale);

  const passwordSchema =
    createPasswordSchema(locale);

  return profileSchema
    .merge(
      z.object({
        currentPassword: z.string().optional(),
        newPassword: z.string().optional(),
        confirmPassword: z.string().optional(),
      })
    )
    .superRefine((data, ctx) => {
      const hasPasswordInput =
        data.currentPassword ||
        data.newPassword ||
        data.confirmPassword;

      if (!hasPasswordInput) {
        return;
      }

      const passwordResult =
        passwordSchema.safeParse({
          currentPassword:
            data.currentPassword ?? '',

          newPassword:
            data.newPassword ?? '',

          confirmPassword:
            data.confirmPassword ?? '',
        });

      if (!passwordResult.success) {
        for (const issue of passwordResult.error
          .issues) {
          ctx.addIssue({
            code: 'custom',
            message: issue.message,
            path: issue.path,
          });
        }
      }
    });
}