import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function FinancialInputsForm() {
  const navigate = useNavigate();
  const [financialInputs, setFinancialInputs] = useState({
    initial_revenue: 100000,
    revenue_growth_rate: 0.5,
    cogs_percentage: 30,
    operating_expenses: 50000,
    initial_capital: 200000,
    monthly_burn_rate: 15000,
    customer_acquisition_cost: 500,
    lifetime_value: 2000,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFinancialInputs({ ...financialInputs, [name]: parseFloat(value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store financialInputs in localStorage or sessionStorage
    localStorage.setItem("financialInputs", JSON.stringify(financialInputs));
    window.location.href = "https://idealab-zeta.vercel.app/dashboard";
  };

  return (
    <div className="p-8">
      <Card className="w-[500px] mx-auto mt-10">
        <CardHeader>
          <CardTitle>Financial Inputs</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Initial Revenue
              </label>
              <Input
                type="number"
                name="initial_revenue"
                value={financialInputs.initial_revenue}
                onChange={handleInputChange}
              />
            </div>
            {/* Add input fields for other financial inputs similarly */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Revenue Growth Rate
              </label>
              <Input
                type="number"
                name="revenue_growth_rate"
                value={financialInputs.revenue_growth_rate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Cost of Goods Sold (COGS) Percentage
              </label>
              <Input
                type="number"
                name="cogs_percentage"
                value={financialInputs.cogs_percentage}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Operating Expenses
              </label>
              <Input
                type="number"
                name="operating_expenses"
                value={financialInputs.operating_expenses}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Initial Capital
              </label>
              <Input
                type="number"
                name="initial_capital"
                value={financialInputs.initial_capital}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Monthly Burn Rate
              </label>
              <Input
                type="number"
                name="monthly_burn_rate"
                value={financialInputs.monthly_burn_rate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Customer Acquisition Cost
              </label>
              <Input
                type="number"
                name="customer_acquisition_cost"
                value={financialInputs.customer_acquisition_cost}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Customer Lifetime Value
              </label>
              <Input
                type="number"
                name="lifetime_value"
                value={financialInputs.lifetime_value}
                onChange={handleInputChange}
              />
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default FinancialInputsForm;
