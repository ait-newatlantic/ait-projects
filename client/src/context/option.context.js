import React, { createContext, useCallback, useEffect, useState } from "react";
import OptionService from "../services/option.service";

export const OptionContext = createContext();

export const OptionProvider = (props) => {
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");

  const fetchOptions = () => {
    OptionService.get_options().then((response) => {
      setOption1(response.data[0].content);
      setOption2(response.data[1].content);
    });
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  return (
    <OptionContext.Provider value={{option1, option2}}>
      {props.children}
    </OptionContext.Provider>
  );
};
