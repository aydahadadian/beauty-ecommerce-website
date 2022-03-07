import { useState, createContext, useContext, useEffect } from "react";
import requestClient from "../Client";
import { refresh_token } from "../Query";


export const ClientContext = createContext();

export const useClient =() =>useContext(ClientContext)

export const ClientWrapper = ({ children }) => {
    const [client] = useState(requestClient);
  
    return (
      <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
    );
  };

  export const CustomerContext = createContext([]);

export const useCustomer = () => useContext(CustomerContext);

export const CustomerWrapper = ({ children }) => {
    const client = useClient();
    const [customer, setCustomer] = useState(null);
    const [working, setWorking] = useState(true);
  
    const refreshToken = () => {
      client
        .request(refresh_token)
        .then(({ refresh_token: { customer, token, expires_in } }) => {
          client.setHeader("authorization", `Bearer ${token}`);
  
          setTimeout(() => {
            refreshToken()
          }, (expires_in * 1000) - 500)
  
          setCustomer(customer);
        })
        .catch(console.log)
        .finally(() => {
          setWorking(false);
        });
    };
    useEffect(() => {
        refreshToken();
        // eslint-disable-next-line
      }, []);
    
      return (
        <CustomerContext.Provider value={{ customer, setCustomer }}>
          {working ? null : children}
        </CustomerContext.Provider>
      );
    };
    
  