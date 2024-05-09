import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./MobileNavigation.module.scss";
import { links } from "../../../libs/FormMaterial";

export default function MobileNavigation() {
  const location = useLocation().pathname.toLowerCase();
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.href}>
          <ul>
            {links.map((links) => {
              return (
                <li key={links.name}>
                  <Link
                    to={links.link}
                    className={location == links.link ? styles.active : null}
                  >
                    <span>
                      <ion-icon
                        name={
                          location == links.link ? links.activeIcon : links.icon
                        }
                      ></ion-icon>
                    </span>
                    <span>{links.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
