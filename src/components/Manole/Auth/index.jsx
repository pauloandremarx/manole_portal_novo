import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import React from "react";

export default  function  Auth({ children }) {
    const router = useRouter();
    const { status } =   useSession({
        required: true,
        onUnauthenticated() {
            router.push("/api/auth/signin");
        },
    });

    if (status === "loading") {
        return children;
    }
    return children;
}