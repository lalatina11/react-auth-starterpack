import { AuthProvider } from "./context/AuthProvider";
import AppRouters from "./routes/Approuters";

const App = () => {
  return (
    <AuthProvider>
      <AppRouters />
    </AuthProvider>
  );
};

export default App;
