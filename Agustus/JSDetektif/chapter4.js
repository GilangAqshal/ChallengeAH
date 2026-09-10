// Crime Database
const employeeDatabase = [
  {
    id: "EMP-001",
    name: "Gita",
    department: "IT",
    security: {
      hasServerAccess: true,
      suspicionScore: 65,
    },
    belongings: ["Wallet", "ID Card", "Keys"],
  },
  {
    id: "EMP-002",
    name: "Hendra",
    department: "Operations",
    security: {
      hasServerAccess: true,
      suspicionScore: 85,
    },
    belongings: ["ID Card", "USB Drive", "Notebook"], // Pelaku potensial?
  },
  {
    id: "EMP-003",
    name: "Indra",
    department: "Marketing",
    security: {
      hasServerAccess: false,
      suspicionScore: 90,
    },
    belongings: ["USB Drive", "Laptop"], // Red Herring! suspicionScore tinggi tapi tidak punya server access & salah dept
  },
  {
    id: "EMP-004",
    name: "Joko",
    department: "IT",
    security: {
      hasServerAccess: true,
      suspicionScore: 40,
    },
    belongings: ["USB Drive", "ID Card"],
  },
];

for (let i = 0; i < employeeDatabase.length; i++) {
  const emp = employeeDatabase[i];

  if (emp.department === "IT" || emp.department === "Operations") {
    if (
      emp.security.hasServerAccess === true &&
      emp.security.suspicionScore > 70 &&
      emp.belongings.includes("USB Drive")
    ) {
      console.log(`Nama pelaku ${emp.name}`);
      console.log(`ID pelaku ${emp.id}`);
      console.log(`Suspicionscore pelaku ${emp.security.suspicionScore}`);
    }
  }
}
