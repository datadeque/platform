import { useContext, useEffect } from 'react'
import { tsParticles } from 'tsparticles'

import { ThemeContext } from 'src/contexts'

const lightThemeConfig = {
  particles: {
    color: {
      value: '#ffffff',
    },
    lineLinked: {
      enable: false,
    },
    links: {
      enable: true,
    },
    move: {
      bounce: true,
      direction: 'none',
      enable: true,
      outMode: 'out',
      random: true,
      speed: 2,
      straight: false,
    },
    opacity: {
      animation: {
        enable: true,
        minimumValue: 0,
        speed: 4,
        sync: false,
      },
      random: true,
      value: 3,
    },
    shape: {
      type: 'circle',
    },
    size: {
      random: true,
      value: { min: 0.3, max: 2.4 },
    },
  },
}

const darkThemeConfig = {
  particles: {
    color: {
      value: '#143A6C',
    },
    lineLinked: {
      enable: false,
    },
    links: {
      enable: true,
      color: {
        value: '#143A6C',
      },
    },
    move: {
      bounce: true,
      direction: 'none',
      enable: true,
      outMode: 'out',
      random: true,
      speed: 2,
      straight: false,
    },
    opacity: {
      animation: {
        enable: true,
        minimumValue: 0,
        speed: 4,
        sync: false,
      },
      random: true,
      value: 3,
    },
    shape: {
      type: 'circle',
    },
    size: {
      random: true,
      value: { min: 0.3, max: 2.4 },
    },
  },
}

export const useParticles = (id: string) => {
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    tsParticles.load(id, theme === 'light' ? lightThemeConfig : darkThemeConfig)
  }, [id, theme])
}
