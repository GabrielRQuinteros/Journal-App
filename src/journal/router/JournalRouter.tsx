import { Navigate, Route } from "react-router"
import { JournalLayout } from "../pages/Layout/JournalLayout"
import { HomePage } from "../pages/HomePage/HomePage";

export const JournalRouter = () => {
  return (
    <>
      <Route path="" element={<JournalLayout />}>
        
        <Route path="home" element= { <HomePage/> } />
        <Route path="*" element={ <Navigate to="/home" replace /> } />
      </Route>
    </>
  );
}
