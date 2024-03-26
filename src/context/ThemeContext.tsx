/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { createContext, useState } from 'react'
import { localStorageConstants } from '../utils/constants'

type Theme = 'light' | 'dark'

export const ThemeContext = createContext({
  theme: 'light' as Theme,
  changeTheme: (theme: Theme) => {},
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const lsTheme = localStorage.getItem(localStorageConstants.theme) as Theme
  const [theme, setTheme] = useState<Theme>(lsTheme ?? 'light')

  const changeTheme = (theme: Theme): void => {
    localStorage.setItem(localStorageConstants.theme, theme)
    setTheme(theme)
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
