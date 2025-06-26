"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import CustomButton2 from "../designedComponents/customButton2";
import CustomButton3 from "../designedComponents/customButton3";

const DeleteBoard = ({
  openDeleteBoard,
  setOpenDeleteBoard,
  selectedBoardId,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return axios.delete(
        `http://localhost:8080/api/boards/${selectedBoardId}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      setOpenDeleteBoard(false);
    },
    onError: (err) => {
      console.error("Failed to delete board:", err);
    },
  });

  const handleClose = () => setOpenDeleteBoard(false);
  const handleDelete = () => mutate();

  return (
    <Dialog
      open={openDeleteBoard}
      onClose={handleClose}
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
    >
      <DialogTitle
        sx={{
          fontFamily: "PlusJakartaSans Medium",
          fontSize: "18px",
          color: "var(--delete-color-text)",
        }}
      >
        Delete this board?
      </DialogTitle>
      <DialogContent>
        <Typography
          sx={{
            fontSize: "12px",
            color: "var(--grey-color)",
            fontFamily: "PlusJakartaSans Medium",
            mb: 1,
          }}
        >
          Are you sure you want to delete the board? This action will remove all
          columns and tasks and cannot be reversed.
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          paddingInline: "25px",
          marginBottom: "15px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <CustomButton3
          sx={{ width: "45% !important" }}
          onClick={handleDelete}
          disabled={isPending}
        >
          {isPending ? "Deleting..." : "Delete"}
        </CustomButton3>
        <CustomButton2 sx={{ width: "45% !important" }} onClick={handleClose}>
          Cancel
        </CustomButton2>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteBoard;
