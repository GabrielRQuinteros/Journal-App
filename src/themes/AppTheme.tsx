import { CssBaseline, ThemeProvider } from "@mui/material"
import { purpleTheme } from "./"
import type { ReactNode } from "react"

export const AppTheme = ( {children}: {children: ReactNode} ) => {
  return (
   <ThemeProvider theme={purpleTheme}>
       <CssBaseline/>
       {children}
   </ThemeProvider>
  )
}
