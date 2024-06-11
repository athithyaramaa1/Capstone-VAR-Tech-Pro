import * as React from "react";
import Button from "@mui/joy/Button";
import Textarea from "@mui/joy/Textarea";
import Stack from "@mui/joy/Stack";

const CategoryForm = ({ onSubmit, value, setValue }) => {
  const textareaRef = React.useRef(null);

  const handleTextareaFocus = () => {
    textareaRef.current?.focus();
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack
        direction="row"
        gap={3}
        sx={{ height: "50px", alignItems: "center" }}
      >
        <Textarea
          placeholder="Add category"
          slotProps={{ textarea: { ref: textareaRef } }}
          sx={{
            width: "400px",
            height: "50px",
            fontSize: "16px",
            color: "#333",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "8px",
          }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          onClick={handleTextareaFocus}
          sx={{ height: "50px" }}
          type="submit"
        >
          Add Category
        </Button>
      </Stack>
    </form>
  );
};

export default CategoryForm;
