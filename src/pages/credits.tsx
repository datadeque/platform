import type { NextPage } from 'next'
import styles from 'src/styles/Credits.module.scss'

const Credits: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Credits</h1>
      <div className={styles.box}>
        <h3>Icons</h3>
        <li>
          <a
            href="https://www.figma.com/community/file/944228750903853832"
            target="_blank"
            rel="noopener noreferrer"
          >
            Amir Baqian - Figma (free with attribution under CC by 4.0)
          </a>
        </li>
        <li>
          <a
            href="https://www.svgrepo.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            SVG Repo (free without attribution under CC0)
          </a>
        </li>
        <h3>Loading Animations CSS</h3>
        <li>
          <a
            href="https://loading.io/css"
            target="_blank"
            rel="noopener noreferrer"
          >
            loading.io (free without attribution under CC0)
          </a>
        </li>
        <h3>Images</h3>
        <li>
          <a
            href="https://unsplash.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Unsplash (free without attribution under Unsplash)
          </a>
        </li>
      </div>
    </div>
  )
}

export default Credits
