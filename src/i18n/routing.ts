

import {defineRouting} from 'next-intl/routing';

// دا الامبورت الخاص بيها 
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en'
});

// دي بقا اللي هتعرف الملفات اللغه ف كل صفحه
export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);