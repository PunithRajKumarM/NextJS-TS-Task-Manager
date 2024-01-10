import CompletedTask from "@/components/completedTask/completedTask";
import Head from "next/head";

// import React, { useEffect, useState } from "react";

interface CompletedTasksProps {
  _id: string;
  title: string;
  description: string;
  date: Date;
  done: boolean;
  submittedDate: Date;
}

interface CompletedTasksPageProps {
  completedTasks: CompletedTasksProps[];
}

export default function CompletedTaskPage({
  completedTasks,
}: CompletedTasksPageProps) {
  // const [completedTasks, setCompletedTasks] = useState([]);
  // useEffect(() => {
  //   async function getCompletedTasks() {
  //     const response = await fetch("/api/tasks/completedTask");
  //     if (!response.ok) {
  //       alert("Failed to fetch!");
  //       return;
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //     if (data) {
  //       setCompletedTasks(data);
  //     }
  //   }
  //   getCompletedTasks();
  // }, []);
  return (
    <div className="completedTasksWrapper">
      <Head>
        <title>Completed Task</title>
      </Head>
      <CompletedTask completedTasks={completedTasks} />
    </div>
  );
}

export const getServerSideProps = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/tasks/completedTask"
    );
    if (!response.ok) {
      console.log("Failed to fetch all the completed tasks.");
      return { props: { completedTasks: [] } };
    }
    const data = await response.json();
    if (data && data.completedTasks) {
      const { completedTasks } = data;
      return { props: { completedTasks } };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { completedTasks: [] } };
  }
};
