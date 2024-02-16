import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./components/context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppWrapper = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>{children}</BrowserRouter>
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default AppWrapper;
