import React, { useEffect } from "react";
import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import TopBanner from "./components/TopBanner/TopBanner";
import AppSkeletonOverlay from "./components/Loader/AppSkeletonOverlay/AppSkeletonOverlay";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import CardDetail from "./pages/CardDetail/CardDetail";
import ProfilePage from "./pages/Profile/ProfilePage";
import SearchResults from "./pages/SearchResults/SearchResults";
import ProfileSettings from "./pages/ProfileSettings/ProfileSettings";

import { ToastProvider } from "./context/ToastContext";
import { useCardContext } from "./context/CardContext";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { GuestRoute } from "./routes/GuestRoute";

import { ROUTES } from "./config/routes";

const AppLayout: React.FC = () => {
    const { isInitialised } = useCardContext();
    const [isReadyToRender, setIsReadyToRender] = React.useState(false);

    useEffect(() => {
        if (isInitialised) {
            requestAnimationFrame(() => setIsReadyToRender(true));
        }
    }, [isInitialised]);

    if (!isInitialised || !isReadyToRender) {
        return <AppSkeletonOverlay />;
    }

    return (
        <ToastProvider>
            <ScrollToTop />
            <TopBanner />
            <Navbar />

            <main>
                <Outlet />
            </main>

            <Footer />
        </ToastProvider>
    );
};

const router = createBrowserRouter(
    [
        {
            element: <AppLayout />,
            children: [
                {
                    path: ROUTES.HOME,
                    element: <Home />,
                },
                {
                    path: ROUTES.EXPLORE,
                    element: <Explore />,
                },
                {
                    path: ROUTES.CARD_DETAIL(":id"),
                    element: <CardDetail />,
                },
                {
                    path: ROUTES.SEARCH,
                    element: <SearchResults />,
                },
                {
                    path: ROUTES.PROFILE(":name"),
                    element: <ProfilePage />,
                },
                {
                    element: <GuestRoute />,
                    children: [
                        {
                            path: ROUTES.SIGNUP,
                            element: <Signup />,
                        },
                        {
                            path: ROUTES.LOGIN,
                            element: <Login />,
                        },
                    ],
                },
                {
                    element: <ProtectedRoute />,
                    children: [
                        {
                            path: ROUTES.PROFILE_SETTINGS,
                            element: <ProfileSettings />,
                        },
                    ],
                },
            ],
        },
    ],
    {
        basename: import.meta.env.BASE_URL,
    },
);

const App: React.FC = () => {
    return <RouterProvider router={router} />;
};

export default App;