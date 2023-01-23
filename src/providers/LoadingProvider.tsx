import * as React from "react";
import { LoadingContext } from "../context/LoadingContext";
import useLoading from "../hooks/useLoading";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

interface Props {
  children: React.ReactNode;
}

function LoadingProvider({ children }: Props) {
  const { loading, setLoading } = useLoading();

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <>
        {children}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <Box sx={{ width: "100%", position: "absolute", top: 0, left: 0 }}>
            <LinearProgress />
          </Box>
        </Backdrop>
      </>
    </LoadingContext.Provider>
  );
}

export default LoadingProvider;
