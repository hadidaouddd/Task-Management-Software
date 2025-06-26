import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Close";
import CustomButton1 from "../designedComponents/customButton1";
import CustomButton2 from "../designedComponents/customButton2";

const AddBoard = ({ openAddBoard, setOpenAddBoard }) => {
  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState([]);
  const queryClient = useQueryClient();

  const handleAddColumn = () => {
    setColumns([...columns, { name: "" }]);
  };

  const handleColumnChange = (index, value) => {
    const updated = [...columns];
    updated[index].name = value;
    setColumns(updated);
  };

  const handleRemoveColumn = (index) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  const createBoard = useMutation({
    mutationFn: (newBoard) =>
      axios.post("http://localhost:8080/api/boards", newBoard),
    onSuccess: () => {
      queryClient.invalidateQueries(["boards"]);
      setOpenAddBoard(false);
    },
  });

  const handleSubmit = () => {
    if (!boardName.trim()) return;
    const payload = {
      title: boardName,
      columns: columns
        .filter((col) => col.name.trim() !== "")
        .map((col, index) => ({
          name: col.name,
          position: index,
        })),
    };
    createBoard.mutate(payload);
  };

  const handleClose = () => {
    setOpenAddBoard(false);
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
      open={openAddBoard}
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
        Add New Board
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
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
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

        <Typography
          sx={{
            fontSize: "12px",
            color: "var(--dialog-text-color)",
            fontFamily: "PlusJakartaSans Medium",
            mb: 1,
          }}
        >
          Columns
        </Typography>

        {columns.map((col, index) => (
          <Box key={index} display="flex" gap={1} alignItems="center" mb={1}>
            <TextField
              fullWidth
              size="small"
              value={col.name}
              onChange={(e) => handleColumnChange(index, e.target.value)}
              sx={{
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
            <IconButton onClick={() => handleRemoveColumn(index)} size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}

        <CustomButton2
          sx={{ width: "100% !important" }}
          onClick={handleAddColumn}
        >
          + Add New Column
        </CustomButton2>
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
          disabled={createBoard.isLoading}
          sx={{
            width: "100% !important",
          }}
        >
          {createBoard.isLoading ? "Creating..." : "Create New Board"}
        </CustomButton1>
      </DialogActions>
    </Dialog>
  );
};

export default AddBoard;
