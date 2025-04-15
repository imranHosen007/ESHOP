import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AdminDashboardEvents,
  AdminDashboardHome,
  AdminDashboardOrders,
  AdminDashboardProducts,
  AdminDashboardSellers,
  AdminDashboardUsers,
  AdminDashboardWithdraw,
  AdminProjectedRoutes,
  AllEvent,
  AllProducts,
  BestSell,
  CheckoutPage,
  CreateEvent,
  CreateProducts,
  DiscountCodes,
  EditEvent,
  EditProduct,
  EventDetialsPage,
  EventPage,
  Faq,
  HomeLayout,
  HomePage,
  Inbox,
  Login,
  NotFound,
  OrderSuccesFull,
  PaymentPage,
  ProductsDetailsPage,
  ProductsPage,
  Profile,
  ProjectedRoute,
  ProjectedRoutes,
  Refunds,
  SellerProjetedRoutes,
  Settings,
  ShopCreatePage,
  ShopDashboardLayout,
  ShopInbox,
  ShopLogin,
  ShopOrderDetails,
  ShopPreview,
  Singup,
  UserOrderDetails,
  WithDrawMoney,
} from "./Routes";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Loader from "./Components/Loader/Loader";

import ShopHomePage from "./Pages/Shop/ShopHomePage";
import ShopDashboard from "./Components/Dashboard/ShopDashboard/ShopDashboard";
import AllOrder from "./Components/Dashboard/ShopDashboard/AllOrder";
import { getFetchUser } from "./Redux/Api/UserApi";
import { getFetchSeller } from "./Redux/Api/SellerApi";
import { ToastContainer } from "react-toastify";
import { getAllEvent } from "./Redux/Api/EventApi";
import { getAllProducts } from "./Redux/Api/ProductApi";
import useAxiosPublic from "./Hooks/useAxiosPublic";
import AdminDashboardLayout from "./Pages/Layout/AdminDashboardLayout";

const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();
  const axiosPublic = useAxiosPublic();
  const { isLoading, isAtuhenticated, user } = useSelector(store => store.user);
  const { seller, isSeller, loading } = useSelector(store => store.seller);

  const stipePromise = loadStripe(
    `pk_test_51PNBw7RuwZPqI3poVmAV1th8ab0I4zFxe6xVCQ1WMTqA8NoQshe3yzaKAFEuuEXsfg3zqZMGNQW1ooQbZPjLenS800UOOefzKx`
  );

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getFetchUser());
    dispatch(getFetchSeller());
    dispatch(getAllEvent());
  }, [dispatch]);

  if (isLoading || loading) {
    return <Loader />;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/products",
          element: <ProductsPage />,
        },
        {
          path: "/best-selling",
          element: <BestSell />,
        },
        {
          path: "/events",
          element: <EventPage />,
        },
        {
          path: "/event/:id",
          element: <EventDetialsPage />,
        },
        {
          path: "/faq",
          element: <Faq />,
        },
        {
          path: "/products/:id",
          element: <ProductsDetailsPage />,
        },
        {
          path: "/inbox",
          element: <Inbox />,
        },
        {
          path: "/profile",
          element: (
            <ProjectedRoutes>
              {" "}
              <Profile />
            </ProjectedRoutes>
          ),
        },
        { path: "/user/order/:id", element: <UserOrderDetails /> },
        {
          path: "/checkout",
          element: (
            <ProjectedRoutes>
              <CheckoutPage />
            </ProjectedRoutes>
          ),
        },
        {
          path: "/payment",
          element: (
            <Elements stripe={stipePromise}>
              <ProjectedRoutes>
                <PaymentPage />
              </ProjectedRoutes>
            </Elements>
          ),
        },
        {
          path: "order-success",
          element: (
            <ProjectedRoutes>
              <OrderSuccesFull />
            </ProjectedRoutes>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: (
        <ProjectedRoute>
          <Login />
        </ProjectedRoute>
      ),
    },
    {
      path: "/sign-up",
      element: (
        <ProjectedRoute>
          <Singup />
        </ProjectedRoute>
      ),
    },
    // -----Shop-Route---
    {
      path: "shop-create",
      element: (
        <ProjectedRoutes>
          <ShopCreatePage />
        </ProjectedRoutes>
      ),
    },
    {
      path: "shop-login",
      element: (
        <ProjectedRoutes>
          <ShopLogin />
        </ProjectedRoutes>
      ),
    },
    {
      path: "/shop/preview/:id",
      element: <ShopPreview />,
    },
    {
      path: "/shop/:id",
      element: <ShopHomePage />,
    },
    {
      path: "/dashboard-order/:id",
      element: <ShopOrderDetails />,
    },
    // -----Shop-Dashboard-----
    {
      path: "dashboard",
      element: <ShopDashboardLayout />,
      children: [
        {
          path: "home",
          element: (
            <SellerProjetedRoutes>
              <ShopDashboard />
            </SellerProjetedRoutes>
          ),
        },
        {
          path: "order",
          element: (
            <SellerProjetedRoutes>
              <AllOrder />
            </SellerProjetedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <SellerProjetedRoutes>
              <AllProducts />
            </SellerProjetedRoutes>
          ),
        },
        {
          path: "create-products",
          element: (
            <SellerProjetedRoutes>
              <CreateProducts />
            </SellerProjetedRoutes>
          ),
        },
        {
          path: "event",
          element: (
            <SellerProjetedRoutes>
              <AllEvent />
            </SellerProjetedRoutes>
          ),
        },
        {
          path: "create-event",
          element: (
            <SellerProjetedRoutes>
              <CreateEvent />
            </SellerProjetedRoutes>
          ),
        },
        {
          path: "withdraw-money",
          element: (
            <SellerProjetedRoutes>
              <WithDrawMoney />
            </SellerProjetedRoutes>
          ),
        },
        {
          path: "edit-product/:id",
          element: (
            <SellerProjetedRoutes>
              <EditProduct />
            </SellerProjetedRoutes>
          ),
        },
        {
          path: "edit-event/:id",
          element: (
            <SellerProjetedRoutes>
              <EditEvent />
            </SellerProjetedRoutes>
          ),
        },
        {
          path: "messages",
          element: <ShopInbox />,
        },
        {
          path: "coupouns",
          element: (
            <SellerProjetedRoutes>
              <DiscountCodes />
            </SellerProjetedRoutes>
          ),
        },
        {
          path: "refunds",
          element: <Refunds />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
      ],
    },
    {
      path: "/*",
      element: <NotFound />,
    },
    // --AdminDashBoard--
    {
      path: "admin",
      element: (
        <AdminProjectedRoutes>
          <AdminDashboardLayout />
        </AdminProjectedRoutes>
      ),
      children: [
        {
          path: "home",
          element: (
            <AdminProjectedRoutes>
              <AdminDashboardHome />
            </AdminProjectedRoutes>
          ),
        },
        {
          path: "users",
          element: (
            <AdminProjectedRoutes>
              <AdminDashboardUsers />
            </AdminProjectedRoutes>
          ),
        },
        {
          path: "orders",
          element: (
            <AdminProjectedRoutes>
              <AdminDashboardOrders />
            </AdminProjectedRoutes>
          ),
        },
        {
          path: "sellers",
          element: (
            <AdminProjectedRoutes>
              <AdminDashboardSellers />
            </AdminProjectedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <AdminProjectedRoutes>
              <AdminDashboardProducts />
            </AdminProjectedRoutes>
          ),
        },
        {
          path: "events",
          element: (
            <AdminProjectedRoutes>
              <AdminDashboardEvents />
            </AdminProjectedRoutes>
          ),
        },
        {
          path: "withdraws",
          element: (
            <AdminProjectedRoutes>
              <AdminDashboardWithdraw />
            </AdminProjectedRoutes>
          ),
        },
      ],
    },
    <ToastContainer />,
  ]);
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
