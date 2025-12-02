import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack"
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeProvider";
import { AuthProvider } from "./context/AuthProvider";
import { UIStateProvider } from "./context/UIStateProvider";
import { QuestionProvider } from "./context/QuestionProvider";
import { AIChatProvider } from "./context/AIChatProvider";
import { PostProvider } from "./context/PostProvider";

function App() {

  return (
    <BrowserRouter>
      <SnackbarProvider maxSnack={1}>
        <ThemeProvider>
          <QuestionProvider>
            <UIStateProvider>
              <AuthProvider>
                <AIChatProvider>
                  <PostProvider>
                    <AppRoutes />
                  </PostProvider>
                </AIChatProvider>
              </AuthProvider>
            </UIStateProvider>
          </QuestionProvider>
        </ThemeProvider>
      </SnackbarProvider>
    </BrowserRouter>
  )
}

export default App
