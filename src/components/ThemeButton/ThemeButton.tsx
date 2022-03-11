import { useContext } from 'react'

import { ThemeContext } from 'src/contexts'
import { sunIcon, moonIcon } from './icons'

import styles from './ThemeButton.module.scss'

export const ThemeButton: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <button
      className={styles.button}
      onClick={toggleTheme}
      title={theme === 'dark' ? 'Turn on the light' : 'Turn off the light'}
    >
      {theme === 'dark' ? sunIcon : moonIcon}
    </button>
  )
}
