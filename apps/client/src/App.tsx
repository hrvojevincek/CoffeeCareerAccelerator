import { Routes, Route } from "react-router-dom";

import JobDetailPage from "./pages/JobDetailPage";
import CompanyPage from "./pages/CompanyPage";
import JobsPage from "./pages/JobsPage";
import UserPage from "./pages/UserPage";
import { useState } from "react";
import React from "react";
import MainPage from "./pages/home/MainPage";
import SignupPage from "./pages/auth/signup/SignupPage";
import LoginPage from "./pages/auth/login/LoginPage";
import Navbar from "./components/Navbar";

type UserContextType = [
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
];

const initialContextState: UserContextType = [
  null,
  () => {
    console.warn("setUser function not yet provided");
  },
];

export const userContext =
  React.createContext<UserContextType>(initialContextState);

console.log(userContext);

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      <userContext.Provider value={[user, setUser]}>
        <Navbar>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/jobs/" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/user/:id/*" element={<UserPage />} />
            <Route path="/employer/:id/*" element={<CompanyPage />} />
            <Route path="/employer" element={<CompanyPage />} />
          </Routes>
        </Navbar>
      </userContext.Provider>
    </>
  );
}

export default App;
