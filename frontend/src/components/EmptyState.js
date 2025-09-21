import { Database } from "lucide-react";

const EmptyState = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px", color: "#52a8f9ff" }}>
      <Database size={210} />
      <p>No query results yet. Try running a query!</p>
    </div>
  );
}

export default EmptyState;