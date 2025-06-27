"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Image from "next/image";
import SideBar from "@/components/sideBar";
import NavBar from "@/components/navBar";
import AddTask from "@/components/tasks/addTask";
import ViewTask from "@/components/tasks/viewTask";
import Board from "@/components/boards/board";
import EditTask from "@/components/tasks/editTask";
import DeleteTask from "@/components/tasks/deleteTask";
import { useMediaQuery, useTheme } from "@mui/material";

export default function Home() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const [selectedBoardId, setSelectedBoardId] = React.useState(null);
  const [selectedBoardName, setSelectedBoardName] = React.useState("");
  const [openTask, setOpenTask] = React.useState(false);
  const [openViewTask, setOpenViewTask] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [fillcolumns, setFillColumns] = React.useState([]);
  const [selectModeTask, setSelectModeTask] = React.useState(null);
  const [openEditBoard, setOpenEditBoard] = React.useState(false);
  const [openDeleteBoard, setOpenDeleteBoard] = React.useState(false);
  const [anchorElSideBar, setAnchorElSideBar] = React.useState(null);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // ~600px - 900px
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // <600px

  const drawerWidth = isMobile ? "0px" : isTablet ? "35%" : "19.5%";

  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}`,
      backgroundColor: "var(--secondary-color)",
      minHeight: "100vh",
      overflowX: "auto",
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    })
  );
  React.useEffect(() => {
    const storedMode = localStorage.getItem("darkMode");
    if (storedMode !== null) {
      const mode = storedMode === "true";
      setDarkMode(mode);
      document.documentElement.setAttribute(
        "data-theme",
        mode ? "dark" : "light"
      );
    }
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <NavBar
        drawerWidth={drawerWidth}
        darkMode={darkMode}
        setOpenTask={setOpenTask}
        setSelectModeTask={setSelectModeTask}
        setOpenEditBoard={setOpenEditBoard}
        setOpenDeleteBoard={setOpenDeleteBoard}
        fillcolumns={fillcolumns}
        isTablet={isTablet}
        isMobile={isMobile}
        setAnchorElSideBar={setAnchorElSideBar}
        anchorElSideBar={anchorElSideBar}
      />
      <SideBar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        drawerWidth={drawerWidth}
        toggleDrawer={toggleDrawer}
        open={open}
        selectedBoardId={selectedBoardId}
        setSelectedBoardId={setSelectedBoardId}
        setSelectedBoardName={setSelectedBoardName}
        anchorElSideBar={anchorElSideBar}
        setAnchorElSideBar={setAnchorElSideBar}
        isMobile={isMobile}
      />
      {!open && !isMobile && (
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            left: 0,
            zIndex: 1200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "56px",
            height: "48px",
            backgroundColor: "var(--primary-color)",
            borderTopRightRadius: "100px",
            borderBottomRightRadius: "100px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "var(--hover-primary-color)",
            },
          }}
          onClick={toggleDrawer}
        >
          <Image
            src={"/open-side-bar.svg"}
            alt="Show sidebar"
            width={16}
            height={11}
          />
        </Box>
      )}
      <Main
        open={open}
        sx={{
          width: "100%",
          display: "flex",
          flexGrow: 1,
          backgroundColor: "var(--secondary-color)",
          minHeight: "100vh",
          maxHeight: "100%",
        }}
      >
        <Box
          sx={{
            marginTop: "97px",
            display: "flex",
            gap: 3,
            minHeight: "80vh",
            width: "fit-content", // so it doesn't stretch beyond content
          }}
        >
          <Board
            selectedBoardId={selectedBoardId}
            setFillColumns={setFillColumns}
            setOpenViewTask={setOpenViewTask}
            setSelectedTask={setSelectedTask}
            openEditBoard={openEditBoard}
            setOpenEditBoard={setOpenEditBoard}
            selectedBoardName={selectedBoardName}
            openDeleteBoard={openDeleteBoard}
            setOpenDeleteBoard={setOpenDeleteBoard}
          />
        </Box>
      </Main>
      {openTask && selectModeTask === "add" && (
        <AddTask
          openTask={openTask}
          setOpenTask={setOpenTask}
          fillcolumns={fillcolumns}
          selectedBoardId={selectedBoardId}
        />
      )}
      {openTask && selectModeTask === "edit" && (
        <EditTask
          openTask={openTask}
          setOpenTask={setOpenTask}
          fillcolumns={fillcolumns}
          selectedBoardId={selectedBoardId}
          selectedTask={selectedTask}
        />
      )}
      {openTask && selectModeTask === "delete" && (
        <DeleteTask
          openTask={openTask}
          setOpenTask={setOpenTask}
          fillcolumns={fillcolumns}
          selectedBoardId={selectedBoardId}
          selectedTask={selectedTask}
        />
      )}
      {openViewTask && (
        <ViewTask
          openViewTask={openViewTask}
          setOpenViewTask={setOpenViewTask}
          selectedTask={selectedTask}
          fillcolumns={fillcolumns}
          selectedBoardId={selectedBoardId}
          setSelectModeTask={setSelectModeTask}
          setOpenTask={setOpenTask}
        />
      )}
    </Box>
  );
}
