import "./globals.css";
export const metadata = {
    title: "Ball",
    description: "",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    );
}
