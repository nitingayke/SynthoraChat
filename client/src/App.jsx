import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeProvider";
import { AuthProvider } from "./context/AuthProvider";
import { UIStateProvider } from "./context/UIStateProvider";
import { QuestionProvider } from "./context/QuestionProvider";
import { AIChatProvider } from "./context/AIChatProvider";

function App() {

  return (
    <BrowserRouter>
      <ThemeProvider>
        <QuestionProvider>
          <UIStateProvider>
            <AuthProvider>
              <AIChatProvider>
                <AppRoutes />
              </AIChatProvider>
            </AuthProvider>
          </UIStateProvider>
        </QuestionProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
