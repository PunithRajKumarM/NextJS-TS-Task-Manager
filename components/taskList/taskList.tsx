import React, { useEffect, useState } from "react";
import Link from "next/link";
import classes from "./taskList.module.css";
import DeleteButton from "../deleteButton/deleteButton";

interface Task {
  _id: string;
  title: string;
  description: string;
  date: Date;
  done: boolean;
}

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  function getIndianStandardTime(givenDate: string): string {
    const dateObject = new Date(givenDate);

    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObject.getFullYear();

    const indianDateFormat = `${day}-${month}-${year}`;

    return indianDateFormat;
  }

  console.log("Today date", new Date().toDateString());

  return (
    <>
      {tasks.map((task) => (
        <div key={task._id} className={classes.taskList}>
          <div className={classes.taskListLeft}>
            <div className={classes.taskListLeftFirst}>
              <h2>{task.title.toUpperCase()}</h2>
              <p>{task.description.toUpperCase()}</p>
            </div>
            <div className={classes.taskListLeftSecond}>
              <span>
                DUE DATE : {getIndianStandardTime(task.date.toLocaleString())}
              </span>

              {new Date(task.date) > new Date() &&
                new Date(task.date).toLocaleDateString() !==
                  new Date().toLocaleDateString() && <p>Pending</p>}
              {new Date(task.date) < new Date() &&
                new Date(task.date).toLocaleDateString() !==
                  new Date().toLocaleDateString() && (
                  <p style={{ color: "red" }}>Over</p>
                )}
              {new Date(task.date).toLocaleDateString() ===
                new Date().toLocaleDateString() && (
                <p style={{ color: "green" }}>Due date</p>
              )}
            </div>
          </div>
          <div className={classes.taskListRight}>
            {/* <button>Done</button> */}

            <Link href={`/editTask/${task._id}`}>
              <button>Edit</button>
            </Link>

            <DeleteButton id={task._id} />
          </div>
        </div>
      ))}
    </>
  );
}
