// Define types for our calculator
interface TaxCalculation {
  price: number;
  taxRate: number;
  taxAmount: number;
  total: number;
}

// Select DOM elements
const priceInput = document.getElementById("price") as HTMLInputElement;
const taxRateInput = document.getElementById("taxRate") as HTMLInputElement;
const calculateButton = document.getElementById(
  "calculate"
) as HTMLButtonElement;
const priceOutput = document.getElementById("priceOutput") as HTMLSpanElement;
const taxOutput = document.getElementById("taxOutput") as HTMLSpanElement;
const totalOutput = document.getElementById("totalOutput") as HTMLSpanElement;

// Function to calculate tax
function calculateTax(price: number, taxRate: number): TaxCalculation {
  // Ensure inputs are valid numbers
  if (isNaN(price) || isNaN(taxRate) || price < 0 || taxRate < 0) {
    throw new Error("Price and tax rate must be valid positive numbers");
  }

  const taxAmount = price * (taxRate / 100);
  const total = price + taxAmount;

  return {
    price,
    taxRate,
    taxAmount,
    total,
  };
}

// Function to format currency
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
}

// Function to update the UI with calculation results
function updateUI(calculation: TaxCalculation): void {
  priceOutput.textContent = formatCurrency(calculation.price);
  taxOutput.textContent = formatCurrency(calculation.taxAmount);
  totalOutput.textContent = formatCurrency(calculation.total);
}

// Event listener for the calculate button
calculateButton.addEventListener("click", (): void => {
  try {
    const price = Number.parseFloat(priceInput.value);
    const taxRate = taxRateInput.value;

    const calculation = calculateTax(price, taxRate);
    updateUI(calculation);
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("An unknown error occurred");
    }
  }
});

// Initialize with default values
updateUI({
  price: 0,
  taxRate: 0,
  taxAmount: 0,
  total: 0,
});
