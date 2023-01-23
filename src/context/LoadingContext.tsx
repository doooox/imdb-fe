import { createContext } from "react";

interface ILoadingContext {
  loading: boolean;
  setLoading: (state: boolean) => void;
}

export const LoadingContext = createContext<ILoadingContext>({
  loading: false,
  setLoading: (state: boolean) => Function,
});
