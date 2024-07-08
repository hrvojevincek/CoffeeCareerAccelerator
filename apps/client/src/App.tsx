import "flowbite";
import "flowbite/dist/flowbite.css";

import { Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import JobDetailPage from "./pages/JobDetailPage";
import CompanyPage from "./pages/CompanyPage";
import JobsPage from "./pages/JobsPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import { useState } from "react";
import React from "react";

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

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      <userContext.Provider value={[user, setUser]}>
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
      </userContext.Provider>
    </>
  );
}

export default App;
s;
