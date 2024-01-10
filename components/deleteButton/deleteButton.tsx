import { useRouter } from "next/router";
import React from "react";

interface DeleteButtonProps {
  id: string;
}

export default function DeleteButton({ id }: DeleteButtonProps) {
  const router = useRouter();
  async function removeTask() {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      console.log(`/api/tasks/removeTask/${id}`);

      const response = await fetch(`/api/tasks/removeTask?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.reload();
      }
    }
  }
  return <button onClick={removeTask}>Remove</button>;
}
