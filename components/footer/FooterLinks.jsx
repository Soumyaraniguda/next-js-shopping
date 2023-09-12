import Link from "next/link";
import styles from "./page.module.scss";
import Image from "next/image";

function FooterLinks() {
  return (
    <div className={styles.footer__links}>
      {links.map((link, index) => (
        <ul key={link.heading}>
          <li>
            {index === 0 ? (
              <Image
                alt="logo"
                src="/images/user-avatar.svg"
                width={28}
                height={28}
              />
            ) : (
              <b>{link.heading}</b>
            )}
            <ul>
              {link.links.map((subLink) => (
                <li key={subLink.name}>
                  <Link href={subLink.link}>{subLink.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default FooterLinks;

const links = [
  {
    heading: "SHOP & PAY",
    links: [
      {
        name: "About us",
        link: "",
      },
      {
        name: "Contact us",
        link: "",
      },
      {
        name: "Social Responsibility",
        link: "",
      },
      {
        name: "",
        link: "",
      },
    ],
  },
  {
    heading: "HELP & SUPPORT",
    links: [
      {
        name: "Shipping Info",
        link: "",
      },
      {
        name: "Returns",
        link: "",
      },
      {
        name: "How To Order",
        link: "",
      },
      {
        name: "How To Track",
        link: "",
      },
      {
        name: "Size Guide",
        link: "",
      },
    ],
  },
  {
    heading: "Customer service",
    links: [
      {
        name: "Customer service",
        link: "",
      },
      {
        name: "Terms and Conditions",
        link: "",
      },
      {
        name: "Consumers (Transactions)",
        link: "",
      },
      {
        name: "Take our feedback survey",
        link: "",
      },
    ],
  },
];
