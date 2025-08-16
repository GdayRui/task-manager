import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const TasksPage = () => {
  return (
    <div>
      <h1>Tasks</h1>
      <Button>
        <Link href="/tasks/new">Create Task</Link>
      </Button>
    </div>
  );
};

export default TasksPage;
