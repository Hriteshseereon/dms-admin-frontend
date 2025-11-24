import { Routes, Route } from "react-router-dom"
import WealthDashboard from "./WealthDashboard"
import StockEtf from "./StockEtf"
export default function WealthModuleRoutes(){
    return (
        <Routes>
            <Route index element={<WealthDashboard />} />
            <Route path="dashboard" element={<WealthDashboard />} />
            <Route path="stocketf" element={<StockEtf />} />

        </Routes>
    )
}