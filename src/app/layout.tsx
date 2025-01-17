"use client";
import "./styles/globals.css";
import StyledComponentsRegistry from "./styled-components";
import { ReactNode } from "react";
import { GlobalStyles } from "./global-styles";
import { ThemeProvider } from "styled-components";
import { theme } from "@/app/styles/theme";
import { ProductProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/authContext";
import Header from "./components/Header/Header";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <ProductProvider>
              <AuthProvider>
                <Header />
                {children}
              </AuthProvider>
            </ProductProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
