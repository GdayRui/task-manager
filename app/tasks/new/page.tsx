import { Button, Flex, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewTaskPage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title"></TextField.Root>
      <TextArea placeholder="Description" />
      <Button>Submit new task</Button>
    </div>
  );
};

export default NewTaskPage;
