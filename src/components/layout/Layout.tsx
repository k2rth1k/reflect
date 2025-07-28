import React, { useState } from "react";
import "./Layout.css";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { MENU } from "./Menu";
import { DarkTheme } from "../../utils/themeColors";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="layout">
      <header
        className="header"
        style={{ backgroundColor: DarkTheme.cardPrimary }}
      >
        <div className="header-left">
          <button className="menu-toggle" onClick={toggleSidebar}>
            ☰
          </button>
          <h1 className="header-title">Reflect</h1>
        </div>
        <div className="header-right">
          <nav className="header-nav">
            <Link to="profile">Profile</Link>
            <Link to="settings">Settings</Link>
          </nav>
        </div>
      </header>

      <div className="layout-body">
        <aside
          className={`sidebar ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
        >
          <nav className="sidebar-nav">
            <ul>
              {MENU.map((item, idx) => (
                <li>
                  <Link to={item.link} className="sidebar-link">
                    <span className="sidebar-icon">{item.icon}</span>
                    <span className="sidebar-text">{item.itemName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <div
          style={{
            marginTop: "1.5em",
            marginLeft: "1.5em",
            marginRight: "1em",
            marginBottom: "1em",
            paddingBottom: "0.4em",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
