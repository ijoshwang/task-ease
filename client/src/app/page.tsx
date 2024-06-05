import Demo from './demo'
import Main from './main'

import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Demo></Demo>
      <Main></Main>
    </main>
  )
}
