import { TextField } from "@mui/material";

export default function PlantForm() {
  return (
    <div>
      <form>
        <TextField
          id="plantName"
          label="Plant Name"
          // defaultValue="Plant Name"
        ></TextField>
      </form>
    </div>
  );
}
