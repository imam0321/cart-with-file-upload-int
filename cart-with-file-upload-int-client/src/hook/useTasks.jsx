import { useQuery } from "@tanstack/react-query";

const useTasks = () => {
  const {
    refetch,
    data: tasks = [],
    isLoading: loading,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/tasks`);
      return res.json();
    },
  });

  return [tasks, loading, refetch];
};

export default useTasks;
