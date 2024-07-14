import { AppBar, Typography } from "@mui/material";

export default function Header() {
  return (
    <div>
      <AppBar position="static">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Plant Pal
        </Typography>
      </AppBar>
    </div>
  );
}
