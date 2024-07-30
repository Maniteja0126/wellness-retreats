import PaymentModal from "./pages/PaymentPage";
import Home from "./pages/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Navbar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/payment" element={<PaymentModal />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
