import { useContext, useEffect } from "react";
import { Can } from "../components/Can";
import { AuthContext } from "../contexts/AuthContext";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext);

  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Hello World: {user?.email}</h1>

      <button onClick={signOut}>Sign Out</button>

      <Can permissions={["metrics.list"]}>
        <div>Metricas</div>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (context) => {
  const apiClient = setupAPIClient(context);

  const response = await apiClient.get("/me");

  return {
    props: {},
  };
});
