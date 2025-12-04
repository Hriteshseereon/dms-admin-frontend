// WealthModule.jsx
import React, { useEffect, useMemo, useState } from "react";
import "./WealthTab.css";
import { FaBoxOpen, FaFileInvoice, FaTachometerAlt } from "react-icons/fa";
import { Tabs } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

import WealthDashboard from "./WealthDashboard";
import StockEtf from "./StockEtf";
import MutualFunds from "./MutualFunds";
import Bank from "./Bank";
import Nps from "./Nps";
import Privatequity from "./Privatequity";
import Deposits from "./Deposits";
import Gold from "./Gold";
import Silver from "./Silver";

/*
  WEALTH_TAB_DEFINITIONS: each tab has
    - id: used by allowedTabs (case-insensitive)
    - label: visible label
    - path: used in URL segment
    - Icon: icon component
    - Component: rendered content for tab
*/
export const WEALTH_TAB_DEFINITIONS = [
  { id: "dashboard", label: "Dashboard", path: "dashboard", Icon: FaTachometerAlt, Component: WealthDashboard },
  { id: "stocketf", label: "Stock & ETF", path: "stocketf", Icon: FaBoxOpen, Component: StockEtf },
  { id: "mutualfunds", label: "Mutualfunds", path: "mutualfunds", Icon: FaFileInvoice, Component: MutualFunds },
  { id: "bank", label: "Bank", path: "bank", Icon: FaFileInvoice, Component: Bank },
  { id: "nps", label: "Nps&Ulip", path: "nps", Icon: FaFileInvoice, Component: Nps },
  { id: "privatequity", label: "Privatequity", path: "privatequity", Icon: FaFileInvoice, Component: Privatequity },
  { id: "deposits", label: "Deposits", path: "deposits", Icon: FaFileInvoice, Component: Deposits },
  { id: "gold", label: "Gold", path: "gold", Icon: FaFileInvoice, Component: Gold },
  { id: "silver", label: "Silver", path: "silver", Icon: FaFileInvoice, Component: Silver },
];

// normalize takes an array of strings and returns lowercased truthy values
const normalize = (values = []) => values.map((v) => v?.toLowerCase()).filter(Boolean);

/*
  getVisibleWealthTabs behaves exactly like AssetModule's logic:
  - If allowedTabs is undefined or empty -> show all tabs
  - If allowedTabs contains some ids -> show only those tabs whose id matches (case-insensitive)
  - If allowedTabs was provided but no ids match -> fallback to full list (same as your current AssetModule behavior)
*/
export const getVisibleWealthTabs = (allowedTabs) => {
  const normalized = new Set(normalize(allowedTabs));
  const filtered = normalized.size > 0
    ? WEALTH_TAB_DEFINITIONS.filter((tab) => normalized.has(tab.id))
    : WEALTH_TAB_DEFINITIONS;

  return filtered.length > 0 ? filtered : WEALTH_TAB_DEFINITIONS;
};

/*
  WealthModule props:
    - allowedTabs: array of tab ids (strings) e.g. ['dashboard','bank','gold']
*/
const WealthModule = ({ allowedTabs }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // visibleTabs updates when allowedTabs changes
  const visibleTabs = useMemo(() => getVisibleWealthTabs(allowedTabs), [allowedTabs]);

  // default tab (first visible)
  const defaultTab = visibleTabs[0];

  // derive last path segment and treat '/dms/wealthmodule' (ending in wealthmodule) as base ""
  const currentSegment = useMemo(() => {
    const cleanedPath = location.pathname.replace(/\/+$/, "");
    const parts = cleanedPath.split("/");
    const lastPart = parts[parts.length - 1] || "";
    return lastPart === "wealthmodule" ? "" : lastPart;
  }, [location.pathname]);

  // determine which tab should be active based on current URL segment
  const derivedActiveTab = useMemo(() => {
    const match = visibleTabs.find(
      (tab) =>
        (tab.path === "" && currentSegment === "") ||
        tab.path.toLowerCase() === currentSegment
    ) || defaultTab;
    return match.id;
  }, [currentSegment, defaultTab, visibleTabs]);

  // controlled activeKey
  const [activeKey, setActiveKey] = useState(derivedActiveTab);

  // keep activeKey in sync with derivedActiveTab and ensure URL matches
  useEffect(() => {
    if (derivedActiveTab !== activeKey) {
      setActiveKey(derivedActiveTab);
    }

    const tabObj = visibleTabs.find((t) => t.id === derivedActiveTab) ?? defaultTab;
    const destination = tabObj.path === "" ? "/wms/dashboard" : `/wms/${tabObj.path}`;

    if (location.pathname !== destination) {
      navigate(destination, { replace: false });
    }
    // NOTE: we intentionally mirror the AssetModule dependency choices
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [derivedActiveTab, visibleTabs, defaultTab, navigate, location.pathname]);

  // user clicks tabs -> navigate
  const handleChange = (key) => {
    const selected = visibleTabs.find((tab) => tab.id === key);
    if (!selected) return;
    setActiveKey(key);
    const destination = selected.path === "" ? "/wms/dashboard" : `/wms/${selected.path}`;
    navigate(destination);
  };

  // create antd tab items
  const tabItems = visibleTabs.map((tab) => {
    const Icon = tab.Icon;
    const Content = tab.Component;
    return {
      key: tab.id,
      label: (
        <>
          <Icon className="inline mr-2 text-amber-500" />
          <span className="text-amber-500">{tab.label}</span>
        </>
      ),
      children: <Content />,
    };
  });

  return (
    <div className="p-2 mt-4 h-[625px] w-full overflow-auto rounded">
      <h1 className="text-2xl font-bold text-amber-800 mb-0">Wealth Module</h1>
      <p className="text-amber-700 mb-3">Manage your wealth data</p>

      <div className="overflow-auto wealth-tabs">
        <Tabs
          activeKey={activeKey}
          onChange={handleChange}
          items={tabItems}
          destroyInactiveTabPane={false}
          tabBarStyle={{ paddingRight: 8 }}
        />
      </div>
    </div>
  );
};

export default WealthModule;
