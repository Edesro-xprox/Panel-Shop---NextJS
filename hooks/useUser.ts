import userService from "@/services/userService";
import { User } from "@/types/user";
import { useEffect, useMemo, useState } from "react";

const useUser = ()=> {
    const [users, setUsers] = useState<User[]>([]); //data de usuarios
    const [search, setSearch] = useState(""); //buscador
    const [loading, setLoading] = useState(true); //loading
    const [loadError, setLoadError] = useState(""); //mensaje de error

    useEffect(() => {
        let cancelled = false;

        const fetchUsers = async () => {
            setLoading(true);
            setLoadError("");
            try {
                const data = await userService.getUsers();
                if (!cancelled) setUsers(data);
            } catch (error) {
                if (!cancelled) {
                setLoadError(
                    error instanceof Error
                    ? error.message
                    : "Ocurrió un error al cargar los usuarios.",
                );
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        void fetchUsers();
        return () => {
            cancelled = true;
        };
    }, []);

    const filteredUsers = useMemo(
        () =>
        users.filter((user) => user.user.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())),
        [search, users]
    );

    return {
        search,
        setSearch,
        loadError,
        loading,
        filteredUsers
    }
}

export default useUser;