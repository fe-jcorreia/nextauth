import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../services/api";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get("/me").then((response) => console.log(response));
  }, []);

  return (
    <h1>Hello World: {user?.email}</h1>
  );
}
