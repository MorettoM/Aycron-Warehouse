import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { attemptGetUser } from "./store/thunks/user";

import {
  HomePage,
  LoginPage,
  LogoutPage,
  RegisterPage,
} from "./pages";
import { ProtectedRoute } from "./components";
import { useAppDispatch } from "./store/hooks";
import { AuthRoute } from "./components/AuthRoute";

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(attemptGetUser())
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return loading ? (
    <p>Loading, API cold start</p>
  ) : (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRoute>
              <HomePage />
            </ProtectedRoute>} />
        <Route
          path='/register'
          element={
            <AuthRoute>
              <RegisterPage />
            </AuthRoute>
          }
        />
        <Route
          path='/login'
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />
        <Route
          path='/logout'
          element={
            <ProtectedRoute>
              <LogoutPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
