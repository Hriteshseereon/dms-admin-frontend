// // Layout.jsx
// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Navbar from "./Navbar";

// const Layout = () => {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="ml-72 flex-1">
//         <Navbar />
//         <div className="pt-20 px-6">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;
// Layout.jsx
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import './SidebarLayout.css'

const Layout = () => {
  const [sidebarWidth, setSidebarWidth] = useState(288); // default 18rem (72 * 4 = 288px)

  useEffect(() => {
    const updateSidebarWidth = () => {
      // Find the first <aside> (assuming Sidebar renders an <aside>)
      const aside = document.querySelector("aside");
      if (aside) {
        const w = Math.round(aside.getBoundingClientRect().width);
        setSidebarWidth(w || 288);
        return;
      }
      // fallback: compute a responsive width for typical 14" laptops (between 1200px-1440px)
      const vw = window.innerWidth;
      if (vw >= 1200 && vw <= 1440) {
        // slightly narrower sidebar on 14" to avoid overflow
        setSidebarWidth(224); // 14rem
      } else {
        setSidebarWidth(288); // 18rem
      }
    };

    updateSidebarWidth();
    window.addEventListener("resize", updateSidebarWidth);
    return () => window.removeEventListener("resize", updateSidebarWidth);
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div
        className="flex-1 transition-all duration-200 main-content"
        style={{ marginLeft: sidebarWidth }}
      >
        <Navbar />
        <div className="pt-20 px-6 outlet-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
