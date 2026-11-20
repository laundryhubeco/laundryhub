import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

function App() {
  const [status, setStatus] = useState("Checking connection...");
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase
        .from("services")
        .select("id, name")
        .limit(5);

      if (error) {
        console.error("Supabase Error:", error);
        setStatus(`Connection error: ${error.message}`);
        return;
      }

      console.log("Supabase Data:", data);
      console.log("Supabase Environment:", {
        url: import.meta.env.VITE_SUPABASE_URL,

        hasKey: Boolean(
          import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
        ),

        keyPrefix: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.slice(0, 15),
      });

      setServices(data);
      setStatus("Supabase connected successfully!");
    }

    testConnection();
  }, []);

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-2xl font-bold">
        LaundryHub
      </h1>

      <p className="mt-4">{status}</p>

      {services.map((service) => (
        <div key={service.id}>
          {service.name}
        </div>
      ))}
    </div>
  );
}

export default App;