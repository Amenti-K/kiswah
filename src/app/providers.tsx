"use client";

import { Provider } from "react-redux";
import store from "@/redux/store";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { fetchBootstrapData } from "@/redux/slices/bootstrapSlice";

function CompanyInfoInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBootstrapData());
  }, [dispatch]);

  return null; // invisible, just triggers fetch
}

export default function CompanyInfoProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <CompanyInfoInitializer />
      {children}
    </Provider>
  );
}
