import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AccessTokenContext } from "../context/AccessTokenContext";
import axios from "../utils/axios";

const styles = {
  container: {
    marginBlock: 20,
  },
  button: {
    width: 200,
  },
};

const Home = () => {
  const { accessToken } = useContext(AccessTokenContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  const getAccounts = () => {
    axios.get(`/get-accounts?access_token=${accessToken}`).then((response) => {
      console.log(response.data);
    });
  };

  const getIdentity = () => {
    axios.get(`/get-identity?access_token=${accessToken}`).then((response) => {
      console.log(response.data);
    });
  };

  const getTransactions = () => {
    axios
      .get(`/get-transactions?access_token=${accessToken}`)
      .then((response) => {
        console.log(response.data);
      });
  };

  const getBalance = () => {
    axios.get(`/get-balance?access_token=${accessToken}`).then((response) => {
      console.log(response.data);
    });
  };

  const getAuth = () => {
    axios.get(`/get-auth?access_token=${accessToken}`).then((response) => {
      console.log(response.data);
    });
  };

  const getLiabilities = () => {
    axios
      .get(`/get-liabilities?access_token=${accessToken}`)
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <div>
      <h1>Welcome to Plaid Quickstart!</h1>
      <div style={styles.container}>
        <button style={styles.button} onClick={getAccounts}>
          Get All Accounts
        </button>
      </div>
      <div style={styles.container}>
        <button style={styles.button} onClick={getIdentity}>
          Get Identity
        </button>
      </div>
      <div style={styles.container}>
        <button style={styles.button} onClick={getTransactions}>
          Get All Transactions
        </button>
      </div>
      <div style={styles.container}>
        <button style={styles.button} onClick={getBalance}>
          Get Balance
        </button>
      </div>
      <div style={styles.container}>
        <button style={styles.button} onClick={getAuth}>
          Get Auth
        </button>
      </div>
      <div style={styles.container}>
        <button style={styles.button} onClick={getLiabilities}>
          Get Liabilities
        </button>
      </div>
    </div>
  );
};

export default Home;
