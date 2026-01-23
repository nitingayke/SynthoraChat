import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack"
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeProvider";
import { AuthProvider } from "./context/AuthProvider";
import { UIStateProvider } from "./context/UIStateProvider";
import { QuestionProvider } from "./context/QuestionProvider";
import { AIChatProvider } from "./context/AIChatProvider";
import { PostProvider } from "./context/PostProvider";
import { SocketProvider } from "./context/SocketProvider";
import { AnalyticsProvider } from "./context/AnalyticsProvider";

function App() {

  return (
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider>
          <SocketProvider>
            <AnalyticsProvider>
              <QuestionProvider>
                <AuthProvider>
                  <UIStateProvider>
                    <AIChatProvider>
                      <PostProvider>
                        <AppRoutes />
                      </PostProvider>
                    </AIChatProvider>
                  </UIStateProvider>
                </AuthProvider>
              </QuestionProvider>
            </AnalyticsProvider>
          </SocketProvider>
        </ThemeProvider>
      </SnackbarProvider>
    </BrowserRouter>
  )
}

export default App
