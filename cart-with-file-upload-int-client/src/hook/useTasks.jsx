import { useQuery } from "@tanstack/react-query";

const useTasks = () => {
  const {
    refetch,
    data: tasks = [],
    isLoading: loading,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch("https://cart-with-file-upload-int-server.vercel.app/tasks");
      return res.json();
    },
  });

  return [tasks, loading, refetch];
};

export default useTasks;
