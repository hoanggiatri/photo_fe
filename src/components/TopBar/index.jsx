import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { fetchModel } from "../../lib/fetchModelData";

import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const location = useLocation();
  const [context, setContext] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (location.pathname === "/users") {
        setContext("User List");
      } else if (location.pathname.startsWith("/users/")) {
        const userId = location.pathname.split("/").pop();
        try {
          const user = await fetchModel(`/api/user/${userId}`);
          setContext(`Details of ${user.first_name} ${user.last_name}`);
        } catch (error) {
          console.error("Failed to fetch user details:", error);
          setContext("User Details Not Available");
        }
      } else if (location.pathname.startsWith("/photos/")) {
        const userId = location.pathname.split("/").pop();
        try {
          const user = await fetchModel(`/api/user/${userId}`);
          setContext(`Photos of ${user.first_name} ${user.last_name}`);
        } catch (error) {
          console.error("Failed to fetch user details:", error);
          setContext("User Photos Not Available");
        }
      }
    }

    fetchData();
  }, [location.pathname]);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit" className="topbar-left">
          Hoàng Gia Trí
        </Typography>
        <Typography variant="h6" color="inherit" className="topbar-right">
          {context}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
