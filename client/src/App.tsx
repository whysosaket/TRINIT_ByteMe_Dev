import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import _404 from "./pages/_404";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthState } from "./Context/AuthContext";

import { GlobalState } from "./Context/GlobalContext";
import About from "./pages/About";
import { TutorDashboard } from "./pages/TutorDashboard";
import { TutorCreateDashboard } from "./pages/TutorCreateDashboard";
import { ClassroomState } from "./Context/ClassroomContext";
import StudentDashboard from "./pages/StudentDashboard";
import { SearchState } from "./Context/SearchContext";
import ScheduleClass from "./pages/ScheduleClass";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        theme="dark"
        closeOnClick
        rtl={false}
        pauseOnHover
        limit={2}
      />
      <Background />
      <GlobalState>
        <AuthState>
          <ClassroomState>
            <SearchState>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              {["/tutordashboard", "/tutordashboard/show"].map(
                (path, index) => (
                  <Route path={path} element={<TutorDashboard />} key={index} />
                )
              )}

              <Route path="/tutordashboard/create" element={<TutorCreateDashboard />} />
              <Route path="/studentdashboard" element={<StudentDashboard />} />
              <Route path="/studentdashboard/schedule" element={<ScheduleClass />} />
              

              {/* <Route path="/join">
              <Route path="" element={<Join />} />
              <Route path=":id" element={<Join />} />
            </Route> */}
              <Route path="*" element={<_404 />} />
            </Routes>
          </Router>
          {/* <Sidebar /> */}
          </SearchState>
          </ClassroomState>
        </AuthState>
      </GlobalState>
    </>
  );
}

export default App;
