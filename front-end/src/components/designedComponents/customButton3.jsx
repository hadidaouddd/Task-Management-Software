import { Button } from "@mui/material";

export default function CustomButton3({
  startIcon,
  disabled,
  value,
  onChange,
  size,
  sx,
  label,
  error,
  required,
  InputLabelProps,
  onClick,
  autoFocus,
  variant,
  type,
  ...props
}) {
  return (
    <Button
      {...{
        startIcon,
        disabled,
        value,
        onChange,
        size,
        sx,
        label,
        error,
        required,
        onClick,
        autoFocus,
        variant,
        type,
        ...props,
      }}
      style={{
        backgroundColor: disabled ? "#cccccc" : "var(--delete-color-text)",
        color: disabled ? "#999999" : "white",
        fontFamily: "PlusJakartaSans Medium",
        borderRadius: "24px",
        boxShadow: "none",
        height: "48px",
        fontSize: "15px",
        textTransform: "capitalize",
        width: "164px",
      }}
      sx={{
        ...sx,
        "&:hover": {
          backgroundColor: "var(--hover-delete-color) !important",
          color: "white",
        },
      }}
      variant="contained"
    ></Button>
  );
}
