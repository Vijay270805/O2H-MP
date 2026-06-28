import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <ThemeProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          className: "font-body text-sm",
          style: {
            borderRadius: "12px",
            background: "#1e1e2a",
            color: "#fff",
          },
        }}
      />
      <Dashboard />
    </ThemeProvider>
  );
};

export default App;
