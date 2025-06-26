"use client";

import * as React from "react";
import {
  Box,
  Drawer,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Skeleton,
  Menu,
} from "@mui/material";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AddBoard from "./boards/addBoard";

const fetchBoards = async () => {
  const res = await axios.get("http://localhost:8080/api/boards");
  return res.data;
};

const SideBar = ({
  darkMode,
  setDarkMode,
  drawerWidth,
  toggleDrawer,
  open,
  selectedBoardId,
  setSelectedBoardId,
  setSelectedBoardName,
  anchorElSideBar,
  setAnchorElSideBar,
  isMobile,
}) => {
  const [openAddBoard, setOpenAddBoard] = React.useState(false);
  const { data: boards = [], isLoading } = useQuery({
    queryKey: ["boards"],
    queryFn: fetchBoards,
    staleTime: 5 * 60 * 1000,
  });

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "light" : "dark"
    );
  };
  const handleSelectBoard = (board) => {
    setSelectedBoardId(board.id);
    setSelectedBoardName(board.title);
  };

  const openSideBar = Boolean(anchorElSideBar);

  const handleCloseList = () => {
    setAnchorElSideBar(null);
  };

  React.useEffect(() => {
    if (boards.length === 0) return;

    const selectedExists = boards.some((b) => b.id === selectedBoardId);

    if (!selectedExists) {
      const nextBoard = boards[0];
      setSelectedBoardId(nextBoard.id);
      setSelectedBoardName(nextBoard.title);
    }
  }, [boards, selectedBoardId, setSelectedBoardId, setSelectedBoardName]);
  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: "97px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "var(--appbar-bg-color)",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box>
          <Typography
            sx={{
              paddingLeft: "25px",
              marginTop: "20px",
              fontFamily: "PlusJakartaSans Medium",
              fontSize: "12px",
              color: "#828FA3",
            }}
          >
            ALL BOARDS ({boards.length})
          </Typography>

          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                animation="wave"
                key={index}
                variant="rounded"
                height={40}
                width="85%"
                sx={{ mt: 2, ml: 3 }}
              />
            ))
          ) : (
            <Box sx={{ marginTop: "10px" }}>
              {boards.map((board) => (
                <ListItem
                  key={board.id}
                  onClick={() => handleSelectBoard(board)}
                  sx={{
                    height: "48px",
                    marginTop: "10px",
                    width: "90%",
                    paddingLeft: "25px",
                    borderTopRightRadius: "100px",
                    borderBottomRightRadius: "100px",
                    cursor: "pointer",
                    backgroundColor:
                      selectedBoardId === board.id
                        ? "var(--primary-color)"
                        : "transparent",
                    color:
                      selectedBoardId === board.id
                        ? "white"
                        : "var(--grey-color)",
                    "&:hover": {
                      backgroundColor:
                        selectedBoardId === board.id
                          ? "var(--hover-primary-color)"
                          : "rgba(99,95,199,0.1)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "black" }}>
                    <Image
                      src={
                        selectedBoardId === board.id
                          ? "/board-split-selected.svg"
                          : "/board-split.svg"
                      }
                      alt="board icon"
                      width={16}
                      height={16}
                    />
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontFamily: "PlusJakartaSans Medium",
                            marginLeft: "-25px",
                          }}
                        >
                          {board.title}
                        </Typography>
                      }
                    />
                  )}
                </ListItem>
              ))}
            </Box>
          )}

          <ListItem
            sx={{
              height: "48px",
              marginTop: "20px",
              color: "var(--primary-color)",
              cursor: "pointer",
              paddingLeft: "25px",
            }}
            onClick={() => setOpenAddBoard(true)}
          >
            <ListItemIcon sx={{ color: "black" }}>
              <Image
                src={"/board-split-create.svg"}
                alt="create new board"
                width={16}
                height={16}
              />
            </ListItemIcon>
            {open && (
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontFamily: "PlusJakartaSans Medium",
                      marginLeft: "-25px",
                    }}
                  >
                    + Create New Board
                  </Typography>
                }
              />
            )}
          </ListItem>
        </Box>

        <Box
          sx={{
            marginTop: "auto",
            marginBottom: "120px",
            display: "flex",
            flexDirection: "column",
            paddingInline: "25px",
          }}
        >
          <Box
            sx={{
              height: "48px",
              backgroundColor: "var(--secondary-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              borderRadius: "6px",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <Image
              src={"/light.svg"}
              alt="light"
              width={18.33}
              height={18.33}
            />
            <Switch
              checked={darkMode}
              onChange={toggleTheme}
              color="primary"
              sx={{
                width: 42,
                height: "20px",
                borderRadius: "100px",
                padding: 0,
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "white",
                },
                "& .MuiSwitch-track": {
                  backgroundColor: "var(--primary-color)",
                  opacity: 1,
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "var(--primary-color)",
                  opacity: 1,
                },
                "& .MuiSwitch-thumb": {
                  marginTop: "-6.4px",
                  boxSizing: "border-box",
                  width: 14,
                  height: 14,
                  marginLeft: "-5px",
                },
              }}
            />
            <Image src={"/dark.svg"} alt="dark" width={15} height={15} />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginTop: "20px",
              cursor: "pointer",
            }}
            onClick={toggleDrawer}
          >
            <Image src={"/Hide.svg"} alt="Hide" width={18} height={16} />
            <Typography
              sx={{
                fontSize: "15px",
                fontFamily: "PlusJakartaSans Medium",
                color: "var(--grey-color)",
              }}
            >
              Hide Sidebar
            </Typography>
          </Box>
        </Box>
      </Drawer>
      {openAddBoard && (
        <AddBoard
          openAddBoard={openAddBoard}
          setOpenAddBoard={setOpenAddBoard}
        />
      )}
      {/* {isMobile && ( */}
      <Menu
        id="basic-menu"
        anchorEl={anchorElSideBar}
        open={openSideBar}
        onClose={handleCloseList}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
        PaperProps={{
          sx: {
            boxShadow: 1,
            backgroundColor: "var(--appbar-bg-color)",
          },
        }}
      >
        <Box>
          <Typography
            sx={{
              paddingLeft: "25px",
              marginTop: "20px",
              fontFamily: "PlusJakartaSans Medium",
              fontSize: "12px",
              color: "#828FA3",
            }}
          >
            ALL BOARDS ({boards.length})
          </Typography>

          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                animation="wave"
                key={index}
                variant="rounded"
                height={40}
                width="85%"
                sx={{ mt: 2, ml: 3 }}
              />
            ))
          ) : (
            <Box sx={{ marginTop: "5px" }}>
              {boards.map((board) => (
                <ListItem
                  key={board.id}
                  onClick={() => handleSelectBoard(board)}
                  sx={{
                    height: "48px",
                    marginTop: "5px",
                    width: "90%",
                    paddingLeft: "25px",
                    borderTopRightRadius: "100px",
                    borderBottomRightRadius: "100px",
                    cursor: "pointer",
                    backgroundColor:
                      selectedBoardId === board.id
                        ? "var(--primary-color)"
                        : "transparent",
                    color:
                      selectedBoardId === board.id
                        ? "white"
                        : "var(--grey-color)",
                    "&:hover": {
                      backgroundColor:
                        selectedBoardId === board.id
                          ? "var(--hover-primary-color)"
                          : "rgba(99,95,199,0.1)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "black" }}>
                    <Image
                      src={
                        selectedBoardId === board.id
                          ? "/board-split-selected.svg"
                          : "/board-split.svg"
                      }
                      alt="board icon"
                      width={16}
                      height={16}
                    />
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontFamily: "PlusJakartaSans Medium",
                            marginLeft: "-25px",
                          }}
                        >
                          {board.title}
                        </Typography>
                      }
                    />
                  )}
                </ListItem>
              ))}
            </Box>
          )}

          <ListItem
            sx={{
              height: "48px",
              color: "var(--primary-color)",
              cursor: "pointer",
              paddingLeft: "25px",
            }}
            onClick={() => setOpenAddBoard(true)}
          >
            <ListItemIcon sx={{ color: "black" }}>
              <Image
                src={"/board-split-create.svg"}
                alt="create new board"
                width={16}
                height={16}
              />
            </ListItemIcon>
            {open && (
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontFamily: "PlusJakartaSans Medium",
                      marginLeft: "-25px",
                    }}
                  >
                    + Create New Board
                  </Typography>
                }
              />
            )}
          </ListItem>
        </Box>

        <Box
          sx={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            paddingInline: "25px",
          }}
        >
          <Box
            sx={{
              height: "48px",
              backgroundColor: "var(--secondary-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              borderRadius: "6px",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <Image
              src={"/light.svg"}
              alt="light"
              width={18.33}
              height={18.33}
            />
            <Switch
              checked={darkMode}
              onChange={toggleTheme}
              color="primary"
              sx={{
                width: 42,
                height: "20px",
                borderRadius: "100px",
                padding: 0,
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "white",
                },
                "& .MuiSwitch-track": {
                  backgroundColor: "var(--primary-color)",
                  opacity: 1,
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "var(--primary-color)",
                  opacity: 1,
                },
                "& .MuiSwitch-thumb": {
                  marginTop: "-6.4px",
                  boxSizing: "border-box",
                  width: 14,
                  height: 14,
                  marginLeft: "-5px",
                },
              }}
            />
            <Image src={"/dark.svg"} alt="dark" width={15} height={15} />
          </Box>
        </Box>
      </Menu>
      {/* )} */}
    </>
  );
};

export default SideBar;
