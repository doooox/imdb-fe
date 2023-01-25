/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";

interface ILoadingContext {
  loading: boolean;
  setLoading: (state: boolean) => void;
}

export const LoadingContext = createContext<ILoadingContext>({
  loading: false,
  setLoading: (_state: boolean) => Function,
});
