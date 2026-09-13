'use client';

import {useTranslations} from 'next-intl';

import {Link} from '@/i18n/routing';
import {
  aboutHero,
  aboutStats,
  teamMembers,
} from '@/data/about';

import AboutHero from './AboutHero';
import StatsCard from './StatsCard';
import TeamMemberCard from './TeamMemberCard';

import ServiceFeaturesSection from '@/components/home/service-features/ServiceFeaturesSection';

import styles from './AboutPage.module.css';

export default function AboutPage() {
  const t = useTranslations('aboutPage');

  return (
    <main className={styles.page}>
      <div className="container">
        <nav
          className={styles.breadcrumbs}
          aria-label={t('breadcrumbLabel')}
        >
          <Link href="/">
            {t('home')}
          </Link>

          <span aria-hidden="true">/</span>

          <span>{t('title')}</span>
        </nav>

        <AboutHero
          title={t('heroTitle')}
          paragraphOne={t('heroParagraphOne')}
          paragraphTwo={t('heroParagraphTwo')}
          image={aboutHero.image}
          imageAlt={t('heroImageAlt')}
        />

        <section
          className={styles.statsSection}
          aria-label={t('statsLabel')}
        >
          {aboutStats.map((stat) => (
            <StatsCard
              key={stat.id}
              value={stat.value}
              icon={stat.icon}
              label={t(`stats.${stat.id}`)}
              isFeatured={stat.id === 'sales'}
            />
          ))}
        </section>

        <section
          className={styles.teamSection}
          aria-labelledby="team-heading"
        >
          <header className={styles.teamHeading}>
            <p>{t('teamEyebrow')}</p>

            <h2 id="team-heading">
              {t('teamTitle')}
            </h2>

            <span>{t('teamDescription')}</span>
          </header>

          <div className={styles.teamGrid}>
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member.id}
                image={member.image}
                name={t(`team.${member.nameKey}`)}
                role={t(`team.${member.roleKey}`)}
                social={member.social}
              />
            ))}
          </div>
        </section>
      </div>

      <ServiceFeaturesSection />
    </main>
  );
}