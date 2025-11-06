import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeProvider";
import { AuthProvider } from "./context/AuthProvider";
import { UIStateProvider } from "./context/UIStateProvider";
import { QuestionProvider } from "./context/QuestionProvider";

function App() {

  return (
    <BrowserRouter>
      <ThemeProvider>
        <QuestionProvider>
          <UIStateProvider>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </UIStateProvider>
        </QuestionProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
