import { useQuery } from "@tanstack/react-query";

const useTasks = () => {
  const {
    refetch,
    data: tasks = [],
    isLoading: loading,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/tasks");
      return res.json();
    },
  });

  return [tasks, loading, refetch];
};

export default useTasks;
