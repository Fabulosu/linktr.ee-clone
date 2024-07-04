import Navbar from "@/components/navbar";
import LoadingProvider from "@/utils/LoadingProvider";

export default async function NavLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <LoadingProvider>
            <Navbar />
            {children}
        </LoadingProvider>
    )
}