"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  MenuItem,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import CustomButton1 from "../designedComponents/customButton1";
import CustomButton2 from "../designedComponents/customButton2";

const AddTask = ({ openTask, setOpenTask, fillcolumns, selectedBoardId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState([""]);
  const [selectedColumnId, setSelectedColumnId] = useState(
    fillcolumns[0]?.id ?? ""
  );

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return axios.post("http://localhost:8080/api/tasks", {
        title,
        description,
        column_id: selectedColumnId,
        subtasks: subtasks
          .filter((s) => s.trim() !== "")
          .map((s) => ({ title: s })),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({
        queryKey: ["board-columns", selectedBoardId],
      });
      setOpenTask(false);
      setTitle("");
      setDescription("");
      setSubtasks([""]);
      setSelectedColumnId(columns[0]?.id ?? "");
    },
  });

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, ""]);
  };

  const handleRemoveSubtask = (index) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleSubtaskChange = (index, value) => {
    const updated = [...subtasks];
    updated[index] = value;
    setSubtasks(updated);
  };

  const handleCreate = () => {
    mutate();
  };
  const handleClose = () => {
    setOpenTask(false);
  };
  return (
    <Dialog
      open={openTask}
      onClose={handleClose}
      maxWidth="xl"
      PaperProps={{
        sx: {
          borderRadius: "6px",
          width: { xs: "480px", sm: "480px", md: "480px" },
          height: "675px",
          boxShadow: "none",
          backgroundColor: "var(--appbar-bg-color)",
        },
      }}
    >
      <DialogTitle
        sx={{
          color: "var(--appbar-text-color)",
          fontFamily: "PlusJakartaSans Medium",
          fontSize: "18px",
        }}
      >
        Add New Task
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
          Title
        </Typography>
        <TextField
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          size="small"
          sx={{
            mb: 4,
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
          Description
        </Typography>
        <TextField
          multiline
          rows={3}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          size="small"
          sx={{
            mb: 4,
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
          Subtasks
        </Typography>
        {subtasks.map((subtask, index) => (
          <Box key={index} display="flex" gap={1} alignItems="center" mb={1}>
            <TextField
              fullWidth
              size="small"
              value={subtask}
              onChange={(e) => handleSubtaskChange(index, e.target.value)}
              placeholder={`Subtask ${index + 1}`}
              sx={{
                mb: 1,
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
            <IconButton onClick={() => handleRemoveSubtask(index)}>
              <CloseIcon sx={{ color: "var(--grey-color)" }} />
            </IconButton>
          </Box>
        ))}
        <CustomButton2
          sx={{ width: "100% !important", mb: 4 }}
          onClick={handleAddSubtask}
        >
          + Add New Subtask
        </CustomButton2>
        <Typography
          sx={{
            fontSize: "12px",
            color: "var(--dialog-text-color)",
            fontFamily: "PlusJakartaSans Medium",
            mb: 1,
          }}
        >
          Status
        </Typography>
        <TextField
          size="small"
          select
          value={selectedColumnId}
          onChange={(e) => setSelectedColumnId(Number(e.target.value))}
          fullWidth
          sx={{
            mb: 4,
            "& .MuiSelect-select": {
              fontFamily: "PlusJakartaSans Medium",
              fontSize: "12px",
              color: "var(--appbar-text-color)",
            },
            "& .MuiSvgIcon-root": {
              color: "var(--grey-color)",
            },
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
        >
          {fillcolumns.map((col) => (
            <MenuItem key={col.id} value={col.id}>
              {col.name}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions
        sx={{
          paddingInline: "25px",
          marginBottom: "15px",
        }}
      >
        <CustomButton1
          onClick={handleCreate}
          disabled={isPending}
          sx={{ width: "100% !important" }}
        >
          {isPending ? "Creating..." : "Create Task"}
        </CustomButton1>
      </DialogActions>
    </Dialog>
  );
};

export default AddTask;
