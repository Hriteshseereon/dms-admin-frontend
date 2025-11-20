import Portfolio from "./pages/Portfolio";
import Investment from "./pages/Investment";

export default function WMS() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Wealth Management System</h2>
      <Portfolio />
      <Investment />
    </div>
  );
}
