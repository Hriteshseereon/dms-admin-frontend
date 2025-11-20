// Sidebar.js
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  FileTextOutlined,
  ApartmentOutlined,
  TagOutlined,
  TeamOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import './SidebarLayout.css'
// import Logo from "./Logo.png";

// ===== Header =====
const SidebarHeader = () => {
  const location = useLocation();

  const linkClasses = (path) =>
    `font-semibold no-underline flex items-center px-1 py-1 rounded-md ${
      location.pathname.startsWith(path)
        ? "bg-amber-100 text-amber-800"
        : "text-amber-800 hover:bg-amber-100"
    }`;

  return (
        <div className="sidebar-header">
           <div className="flex flex-col items-start p-4 border-b border-gray-200">
      <div className="flex items-center space-x-2 flex-nowrap">
        <img
          src="https://res.cloudinary.com/dfm1xhhwx/image/upload/v1763008447/Aumlogo_gvleis.jpg"
          className="h-30 w-60 "
          alt="Logo"
        />
      </div>
      <div className="flex gap-2 mt-4 sidebar-header-tab">
        <NavLink to="/dms" className={linkClasses("/dms")}>
          <DashboardOutlined className="mr-2" />
          Dashboard
        </NavLink>

        <NavLink
          to="/dms/organisation"
          className={linkClasses("/dms/organisation")}
        >
          <ApartmentOutlined className="mr-2" />
          Organisation
        </NavLink>
      </div>
    </div>
        </div>
  );
};

// ===== Menu Items =====
const baseMenuItems = [
  {
    key: "purchase",
    label: "Purchase Module",
    path: "/dms/purchase",
    icon: <ShoppingCartOutlined />,
    required: "purchase",
  },
  {
    key: "sales",
    label: "Sales Module",
    path: "/dms/sales",
    icon: <BarChartOutlined />,
    required: "sales",
  },
  {
    key: "reports",
    label: "Reports & Analytics",
    path: "/dms/reports",
    icon: <FileTextOutlined />,
    required: "reports",
  },
  {
    isSection: true,
    label: "Master Module",
    required: "master",
  },
  {
    key: "master-product",
    label: "Product Master",
    path: "/dms/master/product",
    icon: <TagOutlined />,
    required: "master",
  },
  {
    key: "master-business-partner",
    label: "Business Partner Master",
    path: "/dms/master/business-partner",
    icon: <TeamOutlined />,
    required: "master",
  },
  {
    key: "master-reason",
    label: "Reason Master",
    path: "/dms/master/reason",
    icon: <QuestionCircleOutlined />,
    required: "master",
  },
  {
    isSection: true,
    label: "Asset Module",
    required: "asset",
  },
  {
    key: "asset-product",
    label: "Asset Master",
    path: "/dms/assetmodule",
    icon: <BarChartOutlined />,
    required: "asset",
  },
];

const SidebarMenu = () => {
  const location = useLocation();
  const { user } = useAuth();

  const allowedSubmodules = useMemo(() => {
    const raw =
      user?.role === "admin"
        ? null
        : user?.permissions?.DMS?.submodules || null;

    if (!raw) return null;

    return Object.entries(raw).reduce((acc, [key, value]) => {
      if (value?.allowed) {
        acc.add(key.toLowerCase());
      }
      return acc;
    }, new Set());
  }, [user]);
  const menuItems = useMemo(() => {
    if (!allowedSubmodules || allowedSubmodules.size === 0) {
      return baseMenuItems;
    }
    return baseMenuItems.filter((item) => {
      if (!item.required) return true;
      return allowedSubmodules.has(item.required);
    });
  }, [allowedSubmodules]);

  const getActiveKey = (pathname) => {
    if (pathname.startsWith("/dms/purchase")) return "purchase";
    if (pathname.startsWith("/dms/sales")) return "sales";
    if (pathname.startsWith("/dms/reports")) return "reports";
    if (pathname.startsWith("/dms/master/product")) return "master-product";
    if (pathname.startsWith("/dms/master/business-partner"))
      return "master-business-partner";
    if (pathname.startsWith("/dms/master/reason")) return "master-reason";
    return "";
  };

  const activeKey = getActiveKey(location.pathname);

  return (
    <Menu
      mode="inline"
      selectedKeys={[activeKey]}
      style={{ background: "white", border: "none" }}
      className="
        [&_.ant-menu-item]:text-amber-800
        [&_.ant-menu-item]:font-semibold
        [&_.ant-menu-item:hover]:!bg-amber-100
        [&_.ant-menu-item-active]:!bg-amber-100
        [&_.ant-menu-item-selected]:!bg-amber-100
        [&_.ant-menu-item-selected]:!text-amber-800
        [&_.ant-menu-item .anticon]:!text-amber-800
      "
    >
      {menuItems.map((item) =>
        item.isSection ? (
          <div
            key={item.label}
            className="px-4 py-2 text-amber-800 font-semibold text-sm"
          >
            {item.label}
          </div>
        ) : (
          <Menu.Item key={item.key} icon={item.icon}>
            <NavLink
              to={item.path}
              className="no-underline font-semibold text-amber-800 sidebar-menu-item"
            >
              {item.label}
            </NavLink>
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

const Sidebar = () => (
  <div className="sidebar flex flex-col">
    <SidebarHeader />
    <div className="flex-1 mt-2 overflow-y-auto">
      <SidebarMenu />
    </div>
  </div>
);

export default Sidebar;
