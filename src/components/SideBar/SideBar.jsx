//Library Imports
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
import SideNavButton from "../Custom/SideNavButton";

// Component Imports
import AuthContext from "../../context/AuthContext";
import { ModeToggle } from "../ui/mode-toggle";
import DarkLightModeToggle from "../Custom/DarkLightModeToggle";
import { CustomButton } from "../Custom/CustomButton";
import Images from "@/common/images";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import SearchIcon from "@mui/icons-material/Search";
import BiotechIcon from "@mui/icons-material/Biotech";
import LoginIcon from "@mui/icons-material/Login";
import LandscapeIcon from "@mui/icons-material/Landscape";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { useTheme } from "@/components/ui/theme-provider";
import axios from "axios";

function SideBar({ showSidebar, setShowSidebar }) {
  const { user, logoutUser } = useContext(AuthContext);
  const theme = useTheme();
  const navigate = useNavigate();

  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    user && axios.get("/user/isloggedin/").catch((err) => logoutUser());
  }, [user, logoutUser]);

  const handleMouseEnter = () => {
    setShowSidebar(true);
  };

  const handleMouseLeave = () => {
    setShowSidebar(false);
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    buttonName === "Dashboard"
      ? navigate("/")
      : navigate(`/${buttonName.toLowerCase()}`);
  };

  return (
    <div
      className={`${
        theme.theme === "light" ? "bg-[#f8fee5]" : "bg-[#0f1724]"
      } top-0 left-0 h-screen overflow-hidden transition-all fixed z-40 w-[100px]`}
      style={{
        borderRight:
          theme.theme === "light"
            ? "1px solid rgba(0, 0, 0, 0.08)"
            : "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <div
        className={`flex flex-col h-[90px] p-[24px] justify-center items-center`}
      >
        <img
          height="40px"
          width="40px"
          src={
            theme.theme === "light"
              ? Images.ic_gradient_caves
              : Images.ic_DM_cave
          }
          alt="caves-logo"
        />
        <h1 className={`font-[1000] text-lg font-title`}>CAVES</h1>
      </div>
      {/* FOR AUTHENTICATED USERS */}
      <div className="h-[90%] flex flex-col justify-start">
        {user ? (
          <ul className="flex flex-col justify-between py-12">
            <div className="space-y-4 ">
              <CustomButton
                imgSrc={
                  theme.theme === "light"
                    ? Images.ic_dashboard
                    : Images.ic_DM_dashboard
                }
                className={`w-[80%] ${
                  activeButton === "Dashboard"
                    ? "bg-secondary_background border"
                    : "bg-transparent"
                }`}
                variant="outline"
                width={30}
                showSidebar={showSidebar}
                onClick={() => handleButtonClick("Dashboard")}
              >
                Dashboard
              </CustomButton>

              {user.is_superuser && (
                <CustomButton
                  className={`w-[80%]   ${
                    activeButton === "Admin"
                      ? "bg-secondary_background border"
                      : "bg-transparent"
                  } `}
                  imgSrc={
                    theme.theme === "light"
                      ? Images.ic_project
                      : Images.ic_DM_project
                  }
                  variant="outline"
                  width={30}
                  showSidebar={showSidebar}
                  onClick={() => handleButtonClick("Admin")}
                >
                  Admin
                </CustomButton>
              )}

              <CustomButton
                imgSrc={
                  theme.theme === "light"
                    ? Images.ic_source
                    : Images.ic_DM_source
                }
                className={`w-[80%]   ${
                  activeButton === "Source"
                    ? "bg-secondary_background border"
                    : "bg-transparent"
                }`}
                variant="outline"
                width={30}
                showSidebar={showSidebar}
                onClick={() => handleButtonClick("Source")}
              >
                Sources
              </CustomButton>
              <CustomButton
                imgSrc={
                  theme.theme === "light"
                    ? Images.ic_isolate
                    : Images.ic_DM_isolate
                }
                className={`w-[80%]  ${
                  activeButton === "Isolate"
                    ? "bg-secondary_background border"
                    : "bg-transparent"
                } `}
                variant="outline"
                width={30}
                showSidebar={showSidebar}
                onClick={() => handleButtonClick("Isolate")}
              >
                Isolates
              </CustomButton>
              <CustomButton
                imgSrc={
                  theme.theme === "light"
                    ? Images.ic_logout
                    : Images.ic_DM_logout
                }
                className={`w-[80%]  bg-transparent`}
                variant="outline"
                width={30}
                showSidebar={showSidebar}
                onClick={logoutUser}
              >
                Logout
              </CustomButton>
            </div>
          </ul>
        ) : (
          // FOR NON-AUTHENTICATED USERS
          <section className="flex flex-col gap-0 pt-0 ">
            <SideNavButton
              icon={SpaceDashboardIcon}
              label="Dashboard"
              onClick={() => handleButtonClick("Dashboard")}
              isActive={activeButton === "Dashboard"}
            />
            <SideNavButton
              icon={LandscapeIcon}
              label="Sources"
              onClick={() => handleButtonClick("Source")}
              isActive={activeButton === "Sources"}
            />
            <SideNavButton
              icon={BiotechIcon}
              label="Isolates"
              onClick={() => handleButtonClick("Isolate")}
              isActive={activeButton === "Isolate"}
            />
            <SideNavButton
              icon={AccountTreeIcon}
              label="OntoGraph"
              onClick={() => console.log("OntoGraph Clicked")}
              isActive={activeButton === "OntoGraph"}
            />
            <SideNavButton
              icon={SearchIcon}
              label="OntoDex"
              onClick={() => console.log("OntoDex Clicked")}
              isActive={activeButton === "OntoDex"}
            />
            <SideNavButton
              icon={LoginIcon}
              label="Login"
              onClick={() => navigate("login")}
              isActive={activeButton === "Login"}
            />
          </section>
        )}

        <div className="py-10">
          <DarkLightModeToggle />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
