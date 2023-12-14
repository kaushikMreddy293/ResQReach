import React, { useState, useEffect} from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import { Box } from "@mui/material";
import "./App.css";
import "./index.css";
import Home from './pages/Home';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from './pages/About';
import Profile from "./pages/Profile";
import Header from './components/Header';
import FoodShare from './pages/FoodShare';
import IncidentReport from './pages/IncidentReport';
import IncidentGuide from './pages/IncidentGuide';
import Donation from './pages/Donation';
import MainPage from "./pages/LandingPage";
import ReportForm from "./pages/CreateReport";
import FloodsPage from './pages/Floods';
import EarthquakesPage from './pages/Earthquakes';
import WildfiresPage from './pages/Wildfires';
import TornadoesPage from './pages/Tornadoes';
import WintersPage from './pages/Winters';
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import PaymentSuccess from './pages/PaymentSuccess'
import Listing from './pages/Listing';
import CreateGuide from './pages/CreateGuide';
import Footer from "./components/Footer";
import Other from "./pages/Other";

const App = () => {
  const location = useLocation();
  return (
    <Box width="400px" sx={{ width: { xl: "100%" } }} m="auto">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/resqreach" element={<MainPage />} />
          <Route path="/foodshare" element={<FoodShare />} />
          {/* <Route path="/resqreach/foodshare" element={<FoodShare />} /> */}
          <Route
            path="/resqreach/foodshare/create-listing"
            element={<CreateListing />}
          />
          <Route
            path="/resqreach/foodshare/update-listing/:listingId"
            element={<UpdateListing />}
          />
          <Route path="/resqreach/emergencyguide" element={<IncidentGuide />} />
          <Route path="/resqreach/donation" element={<Donation />} />
          <Route
            path="/resqreach/foodshare/listing/:listingId"
            element={<Listing />}
          />
          <Route path="/viewallincidents" element={<IncidentReport />} />
          <Route path="/reportincident" element={<ReportForm />} />
          <Route path="/guidePreview" element={<IncidentGuide />} />
          <Route path="/create-guide" element={<CreateGuide />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/donation/success" element={<PaymentSuccess />} />
          <Route path="/guidePreview/floods" element={<FloodsPage />} />
          <Route
            path="/guidePreview/earthquakes"
            element={<EarthquakesPage />}
          />
          <Route path="/guidePreview/tornadoes" element={<TornadoesPage />} />
          <Route path="/guidePreview/wildfires" element={<WildfiresPage />} />
          <Route path="/guidePreview/winters" element={<WintersPage />} />
        </Route>
        
        {/* <Route path='/landingpage' element={<LandingPage />} /> */}
        <Route path='/viewallincidents' element={<IncidentReport />} />
        <Route path='/reportincident' element={<ReportForm />} />
        <Route path='/guidePreview' element={<IncidentGuide/>} />
        <Route path='/create-guide' element={<CreateGuide/>} />
        <Route path='/donation' element={<Donation />} />
        <Route path='/donation/success' element={<PaymentSuccess />} />
        <Route path="/guidePreview/floods" element={<FloodsPage />} />
        <Route path="/guidePreview/earthquakes" element={<EarthquakesPage />} />
        <Route path="/guidePreview/tornadoes" element={<TornadoesPage />} />
        <Route path="/guidePreview/wildfires" element={<WildfiresPage />} />
        <Route path="/guidePreview/winters" element={<WintersPage />} />
        <Route path="/guidePreview/other" element={<Other />} />

      </Routes>
      {/* <Footer /> */}
      {/* <Sidebar/> */}
    </Box>
  );
};

export default App;
