import styles from "./PageNotFound.module.css"
import { NavButton } from "@/common/components"

export const PageNotFound = () => (
  <>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <NavButton href={"/"} sx={{ width: "150px", margin: "0 auto" }}>
      Go Home
    </NavButton>
  </>
)
