import AssetsList from "./pages/AssetsList";
import Reports from "./pages/Reports";

export default function AMS() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Asset Management System</h2>
      <AssetsList />
      <Reports />
    </div>
  );
}
