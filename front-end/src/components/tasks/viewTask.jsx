"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Chip,
  TextField,
  MenuItem,
  IconButton,
  Checkbox,
  Menu,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const ViewTask = ({
  selectedTask,
  openViewTask,
  setOpenViewTask,
  fillcolumns,
  selectedBoardId,
  setSelectModeTask,
  setOpenTask,
}) => {
  const [selectedColumnId, setSelectedColumnId] = useState(
    fillcolumns[0]?.id ?? ""
  );
  const [subtaskCheckedState, setSubtaskCheckedState] = useState({});
  const handleClose = () => {
    setOpenViewTask(false);
  };
  const queryClient = useQueryClient();
  console.log(selectedTask, "selectedTask");
  useEffect(() => {
    if (selectedTask?.subtasks) {
      const initialState = {};
      selectedTask.subtasks.forEach((sub) => {
        initialState[sub.id] = sub.is_completed;
      });
      setSubtaskCheckedState(initialState);
    }
  }, [selectedTask]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickOpenList = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseList = () => {
    setAnchorEl(null);
  };

  return (
    <Dialog
      open={openViewTask}
      onClose={handleClose}
      maxWidth="xl"
      PaperProps={{
        sx: {
          borderRadius: "6px",
          width: { xs: "480px", sm: "480px", md: "480px" },
          height: "523px",
          boxShadow: "none",
          backgroundColor: "var(--appbar-bg-color)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "var(--appbar-text-color)",
            fontFamily: "PlusJakartaSans Medium",
            fontSize: "18px",
          }}
        >
          {selectedTask?.title}
        </Typography>
        <IconButton onClick={handleClickOpenList}>
          <Image
            layout="intrinsic"
            src="/Group 6.svg"
            alt="Group 6 Logo"
            width={5}
            height={20}
            priority
          />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography
          sx={{
            color: "var(--grey-color)",
            fontFamily: "PlusJakartaSans Medium",
            fontSize: "13px",
          }}
        >
          {selectedTask?.description}
        </Typography>

        <Typography
          sx={{
            color: "var(--dialog-text-color)",
            fontFamily: "PlusJakartaSans Medium",
            fontSize: "12px",
            marginTop: "25px",
          }}
        >
          Subtasks ({Object.values(subtaskCheckedState).filter(Boolean).length}{" "}
          of {selectedTask?.subtasks.length})
        </Typography>

        <Box
          sx={{
            marginTop: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          {selectedTask?.subtasks.map((subtask) => (
            <Box
              key={subtask.id}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "12px",
                borderRadius: "4px",
                backgroundColor: "var(--secondary-color)",
              }}
            >
              <Checkbox
                size="small"
                checked={subtaskCheckedState[subtask.id] || false}
                onChange={async () => {
                  const newValue = !subtaskCheckedState[subtask.id];
                  // update UI immediately
                  setSubtaskCheckedState((prev) => ({
                    ...prev,
                    [subtask.id]: newValue,
                  }));
                  try {
                    await axios.put(
                      `http://localhost:8080/api/subtasks/${subtask.id}`,
                      {
                        is_completed: newValue,
                      }
                    );
                    queryClient.invalidateQueries({ queryKey: ["tasks"] });
                    queryClient.invalidateQueries({
                      queryKey: ["board-columns", selectedBoardId],
                    });
                  } catch (err) {
                    console.error("Failed to update subtask", err);
                  }
                }}
                disableRipple
                sx={{
                  color: "var(--primary-color)",
                  "&.Mui-checked": {
                    color: "var(--primary-color)",
                  },
                  marginRight: "16px",
                  padding: "0",
                }}
              />
              <Typography
                sx={{
                  color: subtaskCheckedState[subtask.id]
                    ? "var(--grey-color)"
                    : "var(--appbar-text-color)",
                  fontFamily: "PlusJakartaSans Medium",
                  fontSize: "12px",
                  textDecoration: subtaskCheckedState[subtask.id]
                    ? "line-through"
                    : "none",
                }}
              >
                {subtask.title}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              color: "var(--dialog-text-color)",
              fontFamily: "PlusJakartaSans Medium",
              fontSize: "12px",
              marginBottom: "8px",
            }}
          >
            Current Status
          </Typography>
          <TextField
            size="small"
            select
            value={selectedColumnId}
            onChange={async (e) => {
              const newColumnId = Number(e.target.value);
              setSelectedColumnId(newColumnId);
              try {
                await axios.put(
                  `http://localhost:8080/api/tasks/${selectedTask.id}`,
                  {
                    column_id: newColumnId,
                  }
                );
                queryClient.invalidateQueries({ queryKey: ["tasks"] });
                queryClient.invalidateQueries({
                  queryKey: ["board-columns", selectedBoardId],
                });
              } catch (err) {
                console.error("Failed to update task status", err);
              }
            }}
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
        </Box>
      </DialogContent>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseList}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
        PaperProps={{
          sx: {
            backgroundColor: "var(--appbar-bg-color)",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setSelectModeTask("edit");
            setOpenViewTask(false);
            setOpenTask(true);
          }}
          sx={{
            color: "var(--appbar-text-color)",
            fontFamily: "PlusJakartaSans Medium",
            fontSize: "13px",
          }}
        >
          Edit Task
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSelectModeTask("delete");
            setOpenViewTask(false);
            setOpenTask(true);
          }}
          sx={{
            color: "var(--delete-color-text)",
            fontFamily: "PlusJakartaSans Medium",
            fontSize: "13px",
          }}
        >
          Delete Task
        </MenuItem>
      </Menu>
    </Dialog>
  );
};

export default ViewTask;
