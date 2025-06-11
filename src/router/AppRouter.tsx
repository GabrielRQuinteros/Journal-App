import { Navigate, Route, Routes } from "react-router"
import { AuthRouter } from '../auth/router/AuthRouter';
import { JournalRouter } from "../journal/router/JournalRouter";
import { PrivateRoutes } from "./components/PrivateRoutes";
import { PublicRoutes } from "./components/PublicRoutes";

export const AppRouter = () => {
  return (
    <Routes>
        <Route element={ <PublicRoutes/> }>
            <Route path="/" element={<Navigate to="/auth/login" replace />} />
            {AuthRouter()}
        </Route>

        <Route element={ <PrivateRoutes/> } >
            {JournalRouter()}
        </Route>

        <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>


  );
}
