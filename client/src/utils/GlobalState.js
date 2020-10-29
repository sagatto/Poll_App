import React, { createContext, useContext } from "react";
import { usePollReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = usePollReducer({
        // Instantiate inital global state
        allPolls: [],
        // selectedPoll: {},
        // newPoll: {}
      });
    console.log(state);
    return <Provider value={[state, dispatch]} {...props} />;
  };
  const useStoreContext = () => {
    return useContext(StoreContext);
  };
  
  export { StoreProvider, useStoreContext };
  