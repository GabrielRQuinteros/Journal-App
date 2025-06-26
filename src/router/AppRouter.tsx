import { Navigate, Route, Routes } from "react-router"
import { AuthRouter } from '../auth/router/AuthRouter';
import { JournalRouter } from "../journal/router/JournalRouter";
import { PrivateRoutes } from "./components/PrivateRoutes";
import { PublicRoutes } from "./components/PublicRoutes";
import { AuthStatus } from "../store";
import { CheckingAuth } from "../ui/components/CheckingAuth";
import { useCheckAuth } from "../firebase";

export const AppRouter = () => {

  const { status } = useCheckAuth();
  return (
  <>
    <div style={{ display: (status as AuthStatus) === AuthStatus.CHECKING ? 'none' : 'block' }}>
      <Routes>
        {status === AuthStatus.AUTHENTICATED ? (
          <Route element={<PrivateRoutes />}>{JournalRouter()}</Route>
        ) : (
          <Route element={<PublicRoutes />}>
            {AuthRouter()}
          </Route>
        )}
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </div>
    { (status as AuthStatus) === AuthStatus.CHECKING && <CheckingAuth />}
  </>
);
}
