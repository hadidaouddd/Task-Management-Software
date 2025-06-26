import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Close";
import CustomButton1 from "../designedComponents/customButton1";
import CustomButton2 from "../designedComponents/customButton2";

const EditBoard = ({
  openEditBoard,
  setOpenEditBoard,
  fillColumns,
  selectedBoardId,
  selectedBoardName,
}) => {
  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (openEditBoard && fillColumns?.length) {
      setBoardName(selectedBoardName || "");
      setColumns(
        fillColumns.map((col) => ({
          id: col.id,
          name: col.name,
        }))
      );
    }
  }, [openEditBoard, fillColumns, selectedBoardName]);

  const handleAddColumn = () => {
    setColumns([...columns, { id: null, name: "" }]);
  };

  const handleColumnChange = (index, value) => {
    const updated = [...columns];
    updated[index].name = value;
    setColumns(updated);
  };

  const handleRemoveColumn = (index) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  const updateBoard = useMutation({
    mutationFn: (updatedBoard) =>
      axios.put(
        `http://localhost:8080/api/boards/${selectedBoardId}`,
        updatedBoard
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["boards"]);
      setOpenEditBoard(false);
    },
  });

  const handleSubmit = () => {
    if (!boardName.trim()) return;
    const payload = {
      title: boardName,
      columns: columns
        .filter((col) => col.name.trim() !== "")
        .map((col) => ({
          id: col.id,
          name: col.name,
        })),
    };
    updateBoard.mutate(payload);
  };

  const handleClose = () => {
    setOpenEditBoard(false);
  };

  return (
    <Dialog
      maxWidth="xl"
      PaperProps={{
        sx: {
          borderRadius: "6px",
          width: { xs: "480px", sm: "480px", md: "480px" },
          height: "auto",
          boxShadow: "none",
          backgroundColor: "var(--appbar-bg-color)",
        },
      }}
      open={openEditBoard}
      onClose={handleClose}
    >
      <DialogTitle
        sx={{
          color: "var(--appbar-text-color)",
          fontFamily: "PlusJakartaSans Medium",
          fontSize: "18px",
        }}
      >
        Edit Board
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
          Board Name
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
          Board Columns
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
          sx={{ width: "100% !important", mb: 2 }}
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
          disabled={updateBoard.isPending}
          sx={{
            width: "100% !important",
          }}
        >
          {updateBoard.isPending ? "Saving..." : "Save Changes"}
        </CustomButton1>
      </DialogActions>
    </Dialog>
  );
};

export default EditBoard;
