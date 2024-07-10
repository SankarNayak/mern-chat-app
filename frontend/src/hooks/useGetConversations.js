import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext"; // Adjust the import path as needed

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const getConversations = async () => {
      if (!authUser) {
        console.log("No authenticated user");
        return;
      }

      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch conversations");
        }

        const data = await res.json();
        setConversations(data);
      } catch (error) {
        console.error("Error in getConversations:", error);
        toast.error(error.message || "An error occurred while fetching conversations");
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, [authUser]);

  return { loading, conversations };
};

export default useGetConversations;