import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomButton1 from "./designedComponents/customButton1";

const AddColumn = ({ openAddColumn, setOpenAddColumn, selectedBoardId }) => {
  const [columnName, setColumnName] = useState("");
  const queryClient = useQueryClient();

  const createColumn = useMutation({
    mutationFn: (newColumn) =>
      axios.post("http://localhost:8080/api/columns", newColumn),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({
        queryKey: ["board-columns", selectedBoardId],
      });
      setOpenAddColumn(false);
    },
  });

  const handleSubmit = () => {
    if (!columnName.trim()) return;
    const payload = {
      name: columnName,
      board_id: selectedBoardId,
    };
    createColumn.mutate(payload);
  };

  const handleClose = () => {
    setOpenAddColumn(false);
  };
  return (
    <Dialog
      maxWidth="xl"
      PaperProps={{
        sx: {
          borderRadius: "6px",
          width: { xs: "480px", sm: "480px", md: "480px" },
          height: "429px",
          boxShadow: "none",
          backgroundColor: "var(--appbar-bg-color)",
        },
      }}
      open={openAddColumn}
      onClose={handleClose}
    >
      {" "}
      <DialogTitle
        sx={{
          color: "var(--appbar-text-color)",
          fontFamily: "PlusJakartaSans Medium",
          fontSize: "18px",
        }}
      >
        Add New Column
      </DialogTitle>
      <DialogContent>
        <Typography
          sx={{
            fontSize: "12px",
            color: "var(--dialog-text-color)",
            fontFamily: "PlusJakartaSans Medium",
            mb: 1,
          }}
        >
          Name
        </Typography>
        <TextField
          placeholder="Name"
          fullWidth
          size="small"
          value={columnName}
          onChange={(e) => setColumnName(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiInputBase-input": {
              color: "var(--appbar-text-color)",
              fontFamily: "PlusJakartaSans Medium",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "var(--birder-color)",
              },
            },
          }}
        />
      </DialogContent>
      <DialogActions
        sx={{
          paddingInline: "25px",
          marginBottom: "15px",
        }}
      >
        <CustomButton1
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          disabled={createColumn.isLoading}
          sx={{
            width: "100% !important",
          }}
        >
          {createColumn.isLoading ? "Creating..." : "Create New Column"}
        </CustomButton1>
      </DialogActions>
    </Dialog>
  );
};

export default AddColumn;
