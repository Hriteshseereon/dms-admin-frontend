import { Routes, Route } from "react-router-dom"
import WealthDashboard from "./WealthDashboard"
import StockEtf from "./StockEtf"
import MutualFunds from "./MutualFunds"
import Bank from "./Bank"
import Nps from "./Nps"
import Privatequity from "./Privatequity"
import Deposits from "./Deposits"
import Gold from "./Gold"
import Silver from "./Silver"
export default function WMS(){
    return (
        <Routes>
            <Route index element={<WealthDashboard />} />
            <Route path="dashboard" element={<WealthDashboard />} />
            <Route path="stocketf" element={<StockEtf />} />
            <Route path="mutualfunds" element={<MutualFunds />} />
            <Route path="bank" element={<Bank />} />
            <Route path="nps" element={<Nps />} />
            <Route path="privatequity" element={<Privatequity />} />
            <Route path="deposits" element={<Deposits />} />
            <Route path="gold" element={<Gold />} />
            <Route path="silver" element={<Silver />} />

        </Routes>
    )
}