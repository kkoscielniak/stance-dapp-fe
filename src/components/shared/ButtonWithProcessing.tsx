import { Box, Button, ButtonProps, CircularProgress } from "@mui/material";

type Props = {
  isProcessing: boolean;
} & ButtonProps;

const ButtonWithProcessing = (props: Props) => {
  const { disabled, isProcessing, children } = props;

  return (
    <Box sx={{ m: 1, position: "relative" }}>
      <Button disabled={disabled || isProcessing} {...props}>
        {children}
      </Button>
      {isProcessing && (
        <CircularProgress
          size={24}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
};

export default ButtonWithProcessing;
