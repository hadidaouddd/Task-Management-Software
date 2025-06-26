import { Box, Skeleton, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import ShowTasks from "../tasks/showTasks";
import AddColumn from "../addColumn";
import EditBoard from "./editBoard";
import DeleteBoard from "./deleteBoard";
import CustomButton1 from "../designedComponents/customButton1";

const Board = ({
  selectedBoardId,
  setFillColumns,
  setOpenViewTask,
  setSelectedTask,
  openEditBoard,
  setOpenEditBoard,
  selectedBoardName,
  openDeleteBoard,
  setOpenDeleteBoard,
}) => {
  const [openAddColumn, setOpenAddColumn] = useState(false);
  const fetchBoardColumns = async () => {
    const res = await axios.get(
      `http://localhost:8080/api/columns/${selectedBoardId}`
    );
    return res.data;
  };
  const {
    data: columns = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["board-columns", selectedBoardId],
    queryFn: fetchBoardColumns,
    enabled: !!selectedBoardId,
    staleTime: 5 * 60 * 1000,
  });

  if (isError) {
    return (
      <Typography sx={{ textAlign: "center", mt: 10 }} color="error">
        Failed to load board columns.
      </Typography>
    );
  }
  useEffect(() => {
    setFillColumns(columns);
  }, [columns]);
  const COLORS = ["#49C4E5", "#8471F2", "#67E2AE", "gray"];
  return (
    <Box sx={{ width: "100%", display: "flex", gap: 3 }}>
      {(isLoading ? Array.from({ length: 3 }) : columns).map(
        (column, colIdx) => (
          <Box key={column?.id || colIdx} sx={{ minWidth: 320 }}>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                mb: 2,
              }}
            >
              {isLoading ? (
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={15}
                  height={15}
                />
              ) : (
                <Box
                  sx={{
                    width: "15px",
                    height: "15px",
                    backgroundColor: COLORS[colIdx % COLORS.length],
                    borderRadius: "100px",
                  }}
                />
              )}
              <Typography
                sx={{
                  color: "var(--grey-color)",
                  fontSize: "16px",
                  fontFamily: "PlusJakartaSans Medium",
                }}
              >
                {isLoading ? (
                  <Skeleton animation="wave" width={120} />
                ) : (
                  `${column?.name} (${column?.tasks?.length || 0})`
                )}
              </Typography>
            </Box>
            <ShowTasks
              column={column}
              isLoading={isLoading}
              setOpenViewTask={setOpenViewTask}
              setSelectedTask={setSelectedTask}
            />
          </Box>
        )
      )}
      {!isLoading && selectedBoardId != null && columns.length > 0 && (
        <Box
          sx={{
            minWidth: 280,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
            backgroundColor: "var(--add-column-color)",
            marginTop: "38px",
            height: "72vh",
            cursor: "pointer",
          }}
          onClick={() => setOpenAddColumn(true)}
        >
          <Typography
            sx={{
              fontSize: "var(--appbar-title-text-size)",
              fontFamily: "PlusJakartaSans Medium",
              color: "var(--grey-color)",
            }}
          >
            + New Column
          </Typography>
        </Box>
      )}
      {!isLoading && columns.length === 0 && (
        <Box
          sx={{
            width: "100%",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "25px",
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontFamily: "PlusJakartaSans Medium",
              color: "var(--grey-color)",
            }}
          >
            This board is empty. Create a new column to get started.
          </Typography>
          <CustomButton1 onClick={() => setOpenAddColumn(true)}>
            {" "}
            + New Column{" "}
          </CustomButton1>
        </Box>
      )}
      {openAddColumn && (
        <AddColumn
          openAddColumn={openAddColumn}
          setOpenAddColumn={setOpenAddColumn}
          selectedBoardId={selectedBoardId}
        />
      )}
      {openEditBoard && (
        <EditBoard
          openEditBoard={openEditBoard}
          setOpenEditBoard={setOpenEditBoard}
          selectedBoardId={selectedBoardId}
          fillColumns={columns}
          selectedBoardName={selectedBoardName}
        />
      )}
      {openDeleteBoard && (
        <DeleteBoard
          openDeleteBoard={openDeleteBoard}
          setOpenDeleteBoard={setOpenDeleteBoard}
          selectedBoardId={selectedBoardId}
        />
      )}
    </Box>
  );
};

export default Board;
