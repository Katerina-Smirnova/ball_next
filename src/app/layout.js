import "./globals.css";
import {Providers} from "@/app/components/Provider";
import {AppLoader} from "@/app/components/AppLoader";
import {Suspense}  from "react";

export const metadata = {
    title: "Ball",
    description: "",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
        <Providers>
            <AppLoader>
                    {children}
            </AppLoader>
        </Providers>
        </body>
        </html>
    );
}
