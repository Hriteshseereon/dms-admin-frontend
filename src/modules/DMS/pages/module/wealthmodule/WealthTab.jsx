import React, { useEffect, useMemo, useState } from "react";
import './WealthTab.css'
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

export const ASSET_TAB_DEFINITIONS = [
  { id: "dashboard", label: "Dashboard", path: "dashboard", Icon: FaTachometerAlt, Component: WealthDashboard },
  { id: "stocketf", label: "Stock & ETF", path: "stocketf", Icon: FaBoxOpen, Component: StockEtf },
  { id: "mutualfunds", label: "Mutualfunds", path: "mutualfunds", Icon: FaFileInvoice, Component: MutualFunds },
  { id: "bank", label: "Bank", path: "bank", Icon: FaFileInvoice, Component: Bank },
  { id: "nps", label: "Nps&Ulip", path: "nps", Icon: FaFileInvoice, Component: Nps },
  { id: "privatequity", label: "Privatequity", path: "privatequity", Icon: FaFileInvoice, Component: Privatequity },
  { id: "deposits", label: "Deposits", path: "deposits", Icon: FaFileInvoice, Component: Deposits },
  { id: "gold", label: "Gold", path: "gold", Icon: FaFileInvoice, Component: Gold },
  
  { id: "silver", label: "Silver", path: "silver", Icon: FaFileInvoice, Component: Silver },

  // additional tabs can be pushed here...
];

const normalize = (values = []) =>
  values.map((value) => value?.toLowerCase()).filter(Boolean);

export const getVisibleAssetTabs = (allowedTabs) => {
  const normalized = new Set(normalize(allowedTabs));
  const filtered =
    normalized.size > 0
      ? ASSET_TAB_DEFINITIONS.filter((tab) => normalized.has(tab.id))
      : ASSET_TAB_DEFINITIONS;

  return filtered.length > 0 ? filtered : ASSET_TAB_DEFINITIONS;
};

const WealthTab = ({ allowedTabs }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const visibleTabs = useMemo(() => getVisibleAssetTabs(allowedTabs), [allowedTabs]);

  const defaultTab = visibleTabs[0];

  const currentSegment = useMemo(() => {
    const cleanedPath = location.pathname.replace(/\/+$/, "");
    const parts = cleanedPath.split("/");
    const lastPart = parts[parts.length - 1] || "";
    return lastPart === "wealthmodule" ? "" : lastPart;
  }, [location.pathname]);

  const derivedActiveTab = useMemo(() => {
    const match =
      visibleTabs.find(
        (tab) =>
          (tab.path === "" && currentSegment === "") ||
          tab.path.toLowerCase() === currentSegment
      ) || defaultTab;
    return match.id;
  }, [currentSegment, defaultTab, visibleTabs]);

  const [activeKey, setActiveKey] = useState(derivedActiveTab);

  useEffect(() => {
    if (derivedActiveTab !== activeKey) {
      setActiveKey(derivedActiveTab);
    }

    const tabObj = visibleTabs.find((t) => t.id === derivedActiveTab) ?? defaultTab;
    const destination = tabObj.path === "" ? "/dms/wealthmodule" : `/dms/wealthmodule/${tabObj.path}`;

    if (location.pathname !== destination) {
      navigate(destination, { replace: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [derivedActiveTab, visibleTabs, defaultTab, navigate, location.pathname]);

  const handleChange = (key) => {
    const selected = visibleTabs.find((tab) => tab.id === key);
    if (!selected) return;
    setActiveKey(key);
    const destination = selected.path === "" ? "/dms/wealthmodule" : `/dms/wealthmodule/${selected.path}`;
    navigate(destination);
  };

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
      <h1 className="text-2xl font-bold text-amber-800 mb-0">Asset Module</h1>
      <p className="text-amber-700 mb-3">Manage your asset data</p>

      {/* wrap the Tabs in a wrapper we can target for CSS */}
      <div className="overflow-auto wealth-tabs">
        <Tabs
          activeKey={activeKey}
          onChange={handleChange}
          items={tabItems}
          destroyInactiveTabPane={false}
          // optionally control the tab bar style container (keeps default ant styling)
          tabBarStyle={{ paddingRight: 8 }}
        />
      </div>
    </div>
  );
};

export default WealthTab;
