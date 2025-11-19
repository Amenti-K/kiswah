"use client";

import { Provider } from "react-redux";
import store from "@/store/store";
import { useEffect } from "react";
import { fetchCompanyInfo } from "@/store/slices/companyInfoSlice";
import { useAppDispatch } from "@/store/hooks";

// function CompanyInfoInitializer() {
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     dispatch(fetchCompanyInfo());
//   }, [dispatch]);

//   return null; // invisible, just triggers fetch
// }

export default function CompanyInfoProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      {/* <CompanyInfoInitializer /> */}
      {children}
    </Provider>
  );
}
