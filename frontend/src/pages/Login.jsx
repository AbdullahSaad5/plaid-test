import React, { useContext, useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import { useNavigate } from "react-router-dom";
import { AccessTokenContext } from "../context/AccessTokenContext";
import axios from "../utils/axios";
const Login = () => {
  // States
  const [linkToken, setLinkToken] = useState(null);
  const { setAccessToken } = useContext(AccessTokenContext);

  // Navigation
  const navigate = useNavigate();

  // Run once on component mount, create a link token
  const createLinkToken = async () => {
    const response = await axios.get("/create-link-token?client_user_id=123");
    setLinkToken(response.data.link_token);
  };

  //   Config for Plaid Link
  const config = {
    onSuccess: (public_token, metadata) => {
      axios
        .post("/get-access-token", {
          public_token: public_token,
        })
        .then((response) => {
          alert("You have successfully linked your bank account!");
          setAccessToken(response.data.access_token);
          navigate("/home");
        });
    },
    onExit: (err, metadata) => {
      alert("You have exited the link flow");
    },
    token: linkToken,
  };

  //   Run once on component mount, create a link token
  useEffect(() => {
    createLinkToken();
  }, []);

  //   Plaid Link
  const { open, exit, ready } = usePlaidLink(config);

  return (
    <div className="App">
      <h1>Plaid Quick Start</h1>

      <div>
        <button onClick={() => open()} disabled={!ready}>
          Open Link and connect your bank!
        </button>
      </div>
    </div>
  );
};

export default Login;
