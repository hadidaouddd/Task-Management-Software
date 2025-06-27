import Image from "next/image";
import CustomButton1 from "@/components/designedComponents/customButton1";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const NavBar = ({
  drawerWidth,
  darkMode,
  setOpenTask,
  setSelectModeTask,
  setOpenEditBoard,
  setOpenDeleteBoard,
  fillcolumns,
  isTablet,
  isMobile,
  setAnchorElSideBar,
  anchorElSideBar,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickOpenList = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseList = () => {
    setAnchorEl(null);
  };
  const handleClickOpenListSideBar = (event) => {
    setAnchorElSideBar(event.currentTarget);
  };
  return (
    <Box
      position="fixed"
      sx={{
        width: "100%",
        backgroundColor: "var(--appbar-bg-color)",
        color: "var(--appbar-text-color)",
        boxShadow: "none",
        height: isTablet ? "81px" : isMobile ? "64px" : "97px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "97px",
          width: isMobile ? "15%" : isTablet ? "35%" : "19.5%",
          borderRight: !isMobile && "1px solid var(--line-bg-color)",
          display: "flex",
          alignItems: "center",
          paddingLeft: "25px",
        }}
      >
        {!darkMode ? (
          <Image
            layout="intrinsic"
            src={isMobile ? "/logoMobile.svg" : "/Logo.svg"}
            alt="Logo Logo"
            width={isMobile ? 24 : 153}
            height={isMobile ? 25 : 25.5}
            priority
          />
        ) : (
          <Image
            layout="intrinsic"
            src={isMobile ? "/logoMobile.svg" : "/logoDarkMode.svg"}
            alt="logoDarkMode Logo"
            width={isMobile ? 24 : 153}
            height={isMobile ? 25 : 25.5}
            priority
          />
        )}
      </Box>
      <Box
        sx={{
          paddingInline: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: isTablet ? "65%" : isMobile ? "85%" : "80.5%",
          borderBottom: "1px solid var(--line-bg-color)",
          height: isTablet ? "81px" : isMobile ? "64px" : "97px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: isMobile && "pointer",
          }}
          onClick={isMobile ? handleClickOpenListSideBar : null}
        >
          <Typography
            sx={{
              fontFamily: "PlusJakartaSans Medium",
              fontSize: "var(--appbar-title-text-size)",
            }}
          >
            Platform Launch
          </Typography>
          {isMobile && anchorElSideBar != null ? (
            <KeyboardArrowDownIcon />
          ) : (
            isMobile && <KeyboardArrowUpIcon />
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <CustomButton1
            disabled={fillcolumns.length === 0}
            onClick={() => {
              setOpenTask(true);
              setSelectModeTask("add");
            }}
            sx={{
              width: isMobile && "48px !important",
              height: isMobile && "32px !important",
            }}
          >
            {isMobile ? (
              <Image
                layout="intrinsic"
                src="/add.svg"
                alt="add"
                width={12}
                height={12}
                priority
              />
            ) : (
              "+ Add New Task"
            )}
          </CustomButton1>
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
        </Box>
      </Box>
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
            setOpenEditBoard(true);
            setAnchorEl(null);
          }}
          sx={{
            color: "var(--appbar-text-color)",
            fontFamily: "PlusJakartaSans Medium",
            fontSize: "13px",
          }}
        >
          Edit Board
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenDeleteBoard(true);
            setAnchorEl(null);
          }}
          sx={{
            color: "var(--delete-color-text)",
            fontFamily: "PlusJakartaSans Medium",
            fontSize: "13px",
          }}
        >
          Delete Board
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NavBar;
