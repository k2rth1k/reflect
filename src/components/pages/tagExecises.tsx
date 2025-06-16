import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface Exercise {
  id: number;
  exercise_name: string;
  muscle_group: string[];
}

export default function DataGridDemo() {
  const [exercises, setExercises] = React.useState<Exercise[]>([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns: GridColDef<Exercise>[] = [
    {
      field: "exercise_name",
      headerName: "Exercise",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "muscle_group",
      headerName: "Muscle Group",
      headerAlign: "center",
      align: "center",
      width: 440,
      renderCell: (params) => {
        console.log(params.row.muscle_group);
        return (
          <div style={{ display: "flex", height: "100%", width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                height: "100%",
                flexFlow: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "scroll",
                width: "95%",
              }}
            >
              {params.row.muscle_group.map((val, idx) => {
                return (
                  <Chip
                    key={idx}
                    label={val}
                    sx={{ margin: 0.5 }}
                    onClick={() => null}
                  />
                );
              })}
            </Box>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Button
                style={{
                  minHeight: 0,
                  minWidth: 0,
                  width: "1.4em",
                  height: "1.2em",
                  borderRadius: "0.4em",
                  backgroundColor: "steelblue",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "row",
                  color: "white",
                }}
                onClick={() => {
                  handleOpen();
                }}
              >
                +
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    window.electronAPI.getAllExercises().then((val) => {
      setExercises(
        val.map((e, idx) => {
          return {
            id: idx,
            exercise_name: e.exercise_name,
            muscle_group: [],
          };
        }),
      );
    });
  }, []);

  return (
    <Box sx={{ height: 750, width: "fit-content" }}>
      <DataGrid
        rows={exercises}
        columns={columns}
        rowHeight={80}
        sx={{
          "& .MuiDataGrid-cell": {
            borderRight: "1px solid #ccc", // Adjust color and thickness as needed
          },
          "& .MuiDataGrid-cell:last-child": {
            borderRight: "none", // Remove border on the last cell
          },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
              page: 0,
            },
          },
        }}
        pageSizeOptions={[5, 8, 10, 12]}
        disableRowSelectionOnClick
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
