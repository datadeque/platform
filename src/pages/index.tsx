import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useCallback } from 'react'

import { Button } from 'src/components'
import { useParticles } from 'src/hooks'

import styles from 'src/styles/Landing.module.scss'

const opensource = (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.6531 17.0307L3.9585 17.3136H3.9585L4.6531 17.0307ZM4.30609 11.4076L5.03001 11.6037L4.30609 11.4076ZM19.6939 11.4076L18.97 11.6037L19.6939 11.4076ZM19.3469 17.0307L20.0415 17.3136V17.3136L19.3469 17.0307ZM14.0365 20.842L13.9207 20.1009H13.9207L14.0365 20.842ZM9.96352 20.842L9.84775 21.583L9.96352 20.842ZM8.65619 7.61682L8.50688 6.88184V6.88184L8.65619 7.61682ZM15.3438 7.61682L15.1945 8.35181L15.3438 7.61682ZM9.21479 20.725L9.33056 19.984L9.21479 20.725ZM4.74598 17.2587L5.44059 16.9758H5.44058L4.74598 17.2587ZM14.7852 20.725L14.901 21.466L14.7852 20.725ZM19.254 17.2587L18.5594 16.9758L19.254 17.2587ZM15.6199 7.67291L15.7692 6.93793L15.7692 6.93793L15.6199 7.67291ZM8.38009 7.67291L8.5294 8.4079L8.38009 7.67291ZM6.89401 7.44547C6.89401 7.85968 7.2298 8.19547 7.64401 8.19547C8.05822 8.19547 8.39401 7.85968 8.39401 7.44547H6.89401ZM7.64401 7.20939H6.89401H7.64401ZM10.9188 3.14409L10.737 2.41646L10.737 2.41646L10.9188 3.14409ZM10.9871 3.12701L11.1689 3.85464L11.1689 3.85464L10.9871 3.12701ZM14.9208 4.15264L14.4015 4.69381V4.69381L14.9208 4.15264ZM14.657 4.93894C14.9559 5.22572 15.4306 5.21592 15.7174 4.91704C16.0042 4.61816 15.9944 4.14339 15.6955 3.8566L14.657 4.93894ZM13.0154 3.1175L13.1904 2.38819L13.0154 3.1175ZM8.5294 8.4079L8.80551 8.35181L8.50688 6.88184L8.23077 6.93793L8.5294 8.4079ZM15.1945 8.35181L15.4706 8.4079L15.7692 6.93793L15.4931 6.88184L15.1945 8.35181ZM14.6694 19.984L13.9207 20.1009L14.1522 21.583L14.901 21.466L14.6694 19.984ZM10.0793 20.1009L9.33056 19.984L9.09902 21.466L9.84775 21.583L10.0793 20.1009ZM18.6523 16.7478L18.5594 16.9758L19.9486 17.5416L20.0415 17.3136L18.6523 16.7478ZM5.44058 16.9758L5.3477 16.7478L3.9585 17.3136L4.05138 17.5416L5.44058 16.9758ZM5.3477 16.7478C4.67942 15.1069 4.56861 13.3073 5.03001 11.6037L3.58217 11.2116C3.03461 13.2333 3.16669 15.3694 3.9585 17.3136L5.3477 16.7478ZM18.97 11.6037C19.4314 13.3073 19.3206 15.1069 18.6523 16.7478L20.0415 17.3136C20.8333 15.3694 20.9654 13.2333 20.4178 11.2116L18.97 11.6037ZM13.9207 20.1009C12.6486 20.2997 11.3513 20.2997 10.0793 20.1009L9.84775 21.583C11.2732 21.8057 12.7267 21.8057 14.1522 21.583L13.9207 20.1009ZM8.80551 8.35181C10.9117 7.92392 13.0883 7.92392 15.1945 8.35181L15.4931 6.88184C13.1898 6.41392 10.8102 6.41392 8.50688 6.88184L8.80551 8.35181ZM9.33056 19.984C7.55581 19.7067 6.08337 18.5541 5.44059 16.9758L4.05138 17.5416C4.90105 19.6278 6.8268 21.111 9.09902 21.466L9.33056 19.984ZM14.901 21.466C17.1732 21.111 19.0989 19.6278 19.9486 17.5416L18.5594 16.9758C17.9166 18.5541 16.4442 19.7067 14.6694 19.984L14.901 21.466ZM15.4706 8.4079C17.1917 8.75754 18.5371 10.0052 18.97 11.6037L20.4178 11.2116C19.8296 9.03976 18.02 7.39517 15.7692 6.93793L15.4706 8.4079ZM8.23077 6.93793C5.98003 7.39517 4.1704 9.03976 3.58217 11.2116L5.03001 11.6037C5.46295 10.0052 6.80831 8.75754 8.5294 8.4079L8.23077 6.93793ZM8.39401 7.44547V7.20939H6.89401V7.44547H8.39401ZM11.1006 3.87172L11.1689 3.85464L10.8053 2.39938L10.737 2.41646L11.1006 3.87172ZM14.4015 4.69381L14.657 4.93894L15.6955 3.8566L15.44 3.61147L14.4015 4.69381ZM12.8405 3.84681C13.4346 3.98934 13.9737 4.28335 14.4015 4.69381L15.44 3.61147C14.8166 3.01323 14.0385 2.59164 13.1904 2.38819L12.8405 3.84681ZM11.1689 3.85464C11.7165 3.71783 12.2915 3.71512 12.8405 3.84681L13.1904 2.38819C12.4068 2.20023 11.587 2.20406 10.8053 2.39938L11.1689 3.85464ZM8.39401 7.20939C8.39401 5.66024 9.487 4.27491 11.1006 3.87172L10.737 2.41646C8.49317 2.97712 6.89401 4.93383 6.89401 7.20939H8.39401Z" />
    <path d="M12 13.5L12 15.5" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const seo = (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.31573 13.7811L4.04591 13.6098L3.31573 13.7811ZM3.31573 8.324L4.04591 8.49528L3.31573 8.324ZM18.7893 8.324L19.5195 8.15273L18.7893 8.324ZM18.7893 13.781L19.5195 13.9523L18.7893 13.781ZM13.781 18.7893L13.6098 18.0591L13.781 18.7893ZM8.324 18.7893L8.15273 19.5195L8.324 18.7893ZM8.324 3.31573L8.15272 2.58555L8.324 3.31573ZM13.781 3.31573L13.9523 2.58555L13.781 3.31573ZM20.4697 21.5303C20.7626 21.8232 21.2374 21.8232 21.5303 21.5303C21.8232 21.2374 21.8232 20.7626 21.5303 20.4697L20.4697 21.5303ZM4.04591 13.6098C3.65136 11.9278 3.65136 10.1773 4.04591 8.49528L2.58555 8.15272C2.13815 10.06 2.13815 12.045 2.58555 13.9523L4.04591 13.6098ZM18.0591 8.49528C18.4537 10.1773 18.4537 11.9278 18.0591 13.6098L19.5195 13.9523C19.9669 12.045 19.9669 10.06 19.5195 8.15273L18.0591 8.49528ZM13.6098 18.0591C11.9278 18.4537 10.1773 18.4537 8.49528 18.0591L8.15273 19.5195C10.06 19.9669 12.045 19.9669 13.9523 19.5195L13.6098 18.0591ZM8.49528 4.04591C10.1773 3.65136 11.9278 3.65136 13.6098 4.04591L13.9523 2.58555C12.045 2.13815 10.06 2.13815 8.15272 2.58555L8.49528 4.04591ZM8.49528 18.0591C6.28757 17.5413 4.56377 15.8175 4.04591 13.6098L2.58555 13.9523C3.23351 16.7147 5.39038 18.8715 8.15273 19.5195L8.49528 18.0591ZM13.9523 19.5195C16.7147 18.8715 18.8715 16.7147 19.5195 13.9523L18.0591 13.6098C17.5413 15.8175 15.8175 17.5413 13.6098 18.0591L13.9523 19.5195ZM13.6098 4.04591C15.8175 4.56377 17.5413 6.28757 18.0591 8.49528L19.5195 8.15273C18.8715 5.39037 16.7147 3.23351 13.9523 2.58555L13.6098 4.04591ZM8.15272 2.58555C5.39037 3.23351 3.23351 5.39037 2.58555 8.15272L4.04591 8.49528C4.56377 6.28756 6.28757 4.56377 8.49528 4.04591L8.15272 2.58555ZM16.8048 17.8655L20.4697 21.5303L21.5303 20.4697L17.8655 16.8048L16.8048 17.8655Z" />
  </svg>
)

const free = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.88539 8.84875C3.55805 6.13983 5.70602 4.04534 8.43056 3.44162L8.88443 3.34105C10.9366 2.88632 13.0634 2.88632 15.1156 3.34105L15.5694 3.44162C18.294 4.04534 20.442 6.13984 21.1146 8.84875C21.6285 10.9182 21.6285 13.0819 21.1146 15.1512C20.442 17.8602 18.294 19.9547 15.5694 20.5584L15.1156 20.659C13.0634 21.1137 10.9366 21.1137 8.88443 20.659L8.43056 20.5584C5.70601 19.9547 3.55805 17.8602 2.88539 15.1513C2.37154 13.0819 2.37154 10.9181 2.88539 8.84875Z"
      strokeWidth="1.5"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.0002 7C12.3826 7 12.6926 7.29199 12.6926 7.65217V8.18573H12.7692C14.0567 8.18573 15 9.24015 15 10.4189C15 10.7791 14.69 11.0711 14.3077 11.0711C13.9253 11.0711 13.6154 10.7791 13.6154 10.4189C13.6154 9.85137 13.1811 9.49008 12.7692 9.49008H12.6926V11.5432L13.6273 11.8634C14.4767 12.1544 15 12.9457 15 13.7838C15 14.8506 14.1451 15.8142 12.9666 15.8142H12.6926V16.3478C12.6926 16.708 12.3826 17 12.0002 17C11.6179 17 11.3079 16.708 11.3079 16.3478V15.8142H11.2308C9.94328 15.8142 9 14.7598 9 13.581C9 13.2208 9.30996 12.9288 9.69231 12.9288C10.0747 12.9288 10.3846 13.2208 10.3846 13.581C10.3846 14.1486 10.8189 14.5098 11.2308 14.5098H11.3079V12.4568L10.3727 12.1365C9.5233 11.8455 9 11.0542 9 10.2161C9 9.14934 9.85491 8.18573 11.0334 8.18573H11.3079V7.65217C11.3079 7.29199 11.6179 7 12.0002 7ZM11.3079 9.49008H11.0334C10.7306 9.49008 10.3846 9.76055 10.3846 10.2161C10.3846 10.5645 10.6001 10.8265 10.8459 10.9107L11.3079 11.0689V9.49008ZM12.6926 12.9312V14.5098H12.9666C13.2694 14.5098 13.6154 14.2394 13.6154 13.7838C13.6154 13.4355 13.3999 13.1735 13.1541 13.0893L12.6926 12.9312Z"
    />
  </svg>
)

const Home: NextPage = () => {
  const { push } = useRouter()

  const handleClick = useCallback(() => {
    push('/authenticate')
  }, [push])

  useParticles('container')

  return (
    <>
      <div className={styles.landing} id="container">
        <div className={styles.content}>
          <h1 className={styles.title}>DATADEQUE</h1>
          <p>
            Simplify publishing interactive data visualization and insights for
            everybody.
          </p>
          <div>
            <Button label="Get Started" size="lg" onClick={handleClick} />
          </div>
        </div>
      </div>
      <div className={styles.why}>
        <div className={styles.content}>
          <h1>Why Datadeque?</h1>
          <div className={styles.whys}>
            <div className={styles.item}>
              <div className={styles.box}>
                <div className={styles.icon}>{opensource}</div>
              </div>
              Open Source
              <p>
                Datadeque is open source, which allows you to customize our
                service to meet your unique needs.
              </p>
            </div>
            <div className={styles.item}>
              <div className={styles.icon}>{seo}</div>
              SEO
              <p>
                Datadeque uses SEO, which ensures peak performance and that your
                published data is easy to find.
              </p>
            </div>
            <div className={styles.item}>
              <div className={styles.box}>
                <div className={styles.icon}>{free}</div>
              </div>
              Free Plan
              <p>
                Datadeque offers a flexible and free plan to meet your
                requirements. Join us today!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
