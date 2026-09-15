// import type {
//   ServiceFeature,
//   ServiceFeatureIcon,
// } from "@/data/serviceFeatures";

// import styles from "./ServiceFeatureCard.module.css";

// type ServiceFeatureCardProps = {
//   feature: ServiceFeature;
//   title: string;
//   description: string;
// };


// export default function ServiceFeatureCard({
//   feature,
//   title,
//   description,
// }: ServiceFeatureCardProps) {
//   return (


    
//     <article className={styles.card}>
//       <div className={styles.iconWrapper}>
//         <ServiceIcon icon={feature.icon} />
//       </div>

//       <h2 className={styles.title}>
//         {title}
//       </h2>

//       <p className={styles.description}>
//         {description}
//       </p>
//     </article>
//   );
// }

// type ServiceIconProps = {
//   icon: ServiceFeatureIcon;
// };

// function ServiceIcon({icon}: ServiceIconProps) {
//   const commonProps = {
//     className: styles.icon,
//     viewBox: "0 0 48 48",
//     fill: "none",
//     "aria-hidden": true,
//   };

//   switch (icon) {
//     case "delivery":
//       return (
//         <svg {...commonProps}>
//           <path
//             d="M5 10h25v23H5V10Z"
//             stroke="currentColor"
//             strokeWidth="2.5"
//             strokeLinejoin="round"
//           />
//           <path
//             d="M30 17h8l5 7v9H30V17Z"
//             stroke="currentColor"
//             strokeWidth="2.5"
//             strokeLinejoin="round"
//           />
//           <circle
//             cx="14"
//             cy="35"
//             r="4"
//             stroke="currentColor"
//             strokeWidth="2.5"
//           />
//           <circle
//             cx="36"
//             cy="35"
//             r="4"
//             stroke="currentColor"
//             strokeWidth="2.5"
//           />
//         </svg>
//       );

//     case "support":
//       return (
//         <svg {...commonProps}>
//           <path
//             d="M8 27v-3a16 16 0 0 1 32 0v3"
//             stroke="currentColor"
//             strokeWidth="2.5"
//             strokeLinecap="round"
//           />
//           <path
//             d="M8 25h7v12H8a4 4 0 0 1-4-4v-4a4 4 0 0 1 4-4ZM40 25h-7v12h7a4 4 0 0 0 4-4v-4a4 4 0 0 0-4-4Z"
//             stroke="currentColor"
//             strokeWidth="2.5"
//             strokeLinejoin="round"
//           />
//           <path
//             d="M33 38c0 4-4 6-9 6"
//             stroke="currentColor"
//             strokeWidth="2.5"
//             strokeLinecap="round"
//           />
//         </svg>
//       );

//     case "guarantee":
//       return (
//         <svg {...commonProps}>
//           <path
//             d="M24 4 39 10v11c0 10-6.4 18-15 23-8.6-5-15-13-15-23V10L24 4Z"
//             stroke="currentColor"
//             strokeWidth="2.5"
//             strokeLinejoin="round"
//           />
//           <path
//             d="m16 24 5 5 11-11"
//             stroke="currentColor"
//             strokeWidth="2.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       );
//   }
// }


import Image from "next/image";
import type {
  ServiceFeature,
  ServiceFeatureIcon,
} from "@/data/serviceFeatures";

import styles from "./ServiceFeatureCard.module.css";

type ServiceFeatureCardProps = {
  feature: ServiceFeature;
  title: string;
  description: string;
};

const featureImageMap: Record<ServiceFeatureIcon, string> = {
  delivery: "/images/Services-Fast delivery.png",
  support: "/images/Services-Customer Service.png",
  guarantee: "/images/Services-Money back.png",
};

export default function ServiceFeatureCard({
  feature,
  title,
}: ServiceFeatureCardProps) {
  const imageSrc = featureImageMap[feature.icon];

  return (
    <article className={styles.card}>
      <Image
        src={imageSrc}
        alt={title}
        width={249}
        height={161}
        className={styles.featureImage}
        priority
      />
    </article>
  );
}