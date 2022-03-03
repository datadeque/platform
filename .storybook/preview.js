import '../src/styles/globals.scss'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <>
      <div className="theme-dark">
        <div className="main" style={{ padding: 50 }}>
          <Story />
        </div>
      </div>
      <div className="theme-light">
        <div className="main" style={{ padding: 50 }}>
          <Story />
        </div>
      </div>
    </>
  ),
]
