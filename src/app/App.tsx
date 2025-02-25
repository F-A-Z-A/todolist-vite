import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { useAppSelector } from "../common/hooks/useAppSelector";
import CssBaseline from "@mui/material/CssBaseline";
import { Header } from "@/common/components/Header/Header.tsx";
import { getTheme } from "@/common/theme/theme.ts";
import { selectThemeMode } from "@/app/app-selectors.ts";
import { Main } from "@/common/components/Main/Main.tsx";

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const theme = getTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <div className={"app"}>
        <CssBaseline />
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  );
};
