import { Button } from "@mui/material";

export default function CustomButton1({
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
        backgroundColor: disabled ? "#cccccc" : "var(--primary-color)",
        color: "white",
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
          backgroundColor: "var(--hover-primary-color) !important",
          color: "white",
        },
      }}
      variant="contained"
    ></Button>
  );
}
