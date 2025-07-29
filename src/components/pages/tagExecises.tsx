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
import { DarkTheme } from "../../utils/themeColors";

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
  const [selectedExercise, setSelectedExercise] = React.useState<string | null>(null);
  const [tagInput, setTagInput] = React.useState("");
  const handleOpen = (exerciseName?: string) => {
    setSelectedExercise(exerciseName || null);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setTagInput("");
    setSelectedExercise(null);
  };

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
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                overflowX: "auto",
                overflowY: "scroll",
                width: "95%",
                height: "100%",
                maxHeight: 70,
                minHeight: 70,
                padding: 0.5,
                gap: 0.5,
                scrollBehavior: "smooth",
              }}
            >
              {params.row.muscle_group.map((val, idx) => (
                <Chip
                  key={idx}
                  label={val}
                  sx={{
                    margin: 0.5,
                    minWidth: 80,
                    maxWidth: 120,
                    height: 28,
                    fontSize: 14,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    backgroundColor: DarkTheme.cardPrimary,
                    color: DarkTheme.boldText,
                    border: `1px solid ${DarkTheme.separatingLineColor}`,
                  }}
                  onClick={() => null}
                />
              ))}
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
                  handleOpen(params.row.exercise_name);
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
    window.electronAPI.getAllExerciseDetails().then((val) => {
      setExercises(
        val.map((e, idx) => {
          console.log(e.tags);
          return {
            id: idx,
            exercise_name: e.exercise_name,
            muscle_group: e.tags, // Ensure tags are trimmed
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
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: DarkTheme.cardPrimary, // Adjust color and thickness as needed
          },
          "& .MuiDataGrid-cell": {
            borderRight: `1px solid ${DarkTheme.separatingLineColor}`, // Adjust color and thickness as needed
          },
          "& .MuiTablePagination-actions": {
            color: DarkTheme.boldText,
          },
          "& .MuiTablePagination-selectLabel": {
            color: DarkTheme.boldText,
          },
          "& .MuiTablePagination-select": {
            color: DarkTheme.boldText,
          },
          "& .MuiTablePagination-displayedRows": {
            color: DarkTheme.boldText,
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: DarkTheme.hover,
          },
          "& .MuiDataGrid-row": {
            borderBottom: `0px solid ${DarkTheme.separatingLineColor}`,
          },
          "& .MuiDataGrid-cell:last-child": {
            borderRight: "none", // Remove border on the last cell
          },
          border: `1px solid ${DarkTheme.separatingLineColor}`,
          backgroundColor: DarkTheme.cardPrimary,
          color: DarkTheme.boldText,
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
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (selectedExercise && tagInput.trim() !== "") {
          // Get the exercise object
          const exercise = exercises.find(ex => ex.exercise_name === selectedExercise);
          if (exercise) {
            // Add the tag to the muscle_group array
            const newTags = [...exercise.muscle_group, tagInput.trim()];
            // Update backend
            await window.electronAPI.upsertExerciseTags(selectedExercise, newTags);
            // Update local state
            setExercises(exercises.map(ex =>
              ex.exercise_name === selectedExercise
            ? { ...ex, muscle_group: newTags }
            : ex
            ));
          }
          setTagInput("");
          // Do not close the modal here
            }
          }}
        >
          <input
            type="text"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            placeholder="Enter tag for the exercise"
            style={{
          width: "100%",
          padding: "0.5em",
          borderRadius: "0.4em",
          border: `1px solid ${DarkTheme.separatingLineColor}`,
          backgroundColor: DarkTheme.cardPrimary,
          color: DarkTheme.boldText,
          marginBottom: "1em",
            }}
          />
          <Button type="submit" variant="contained" color="primary" disabled={tagInput.trim() === ""}>
            Add Tag
          </Button>
        </form>
        {selectedExercise && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Current Tags:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {exercises.find(ex => ex.exercise_name === selectedExercise)?.muscle_group.map((tag, idx) => (
            <Chip
              key={tag + idx}
              label={tag}
              sx={{
            backgroundColor: DarkTheme.cardPrimary,
            color: DarkTheme.boldText,
            border: `1px solid ${DarkTheme.separatingLineColor}`,
            "& .MuiChip-deleteIcon": {
              color: "red",
              "&:hover": {
                color: "darkred",
              },
            },
              }}
              onDelete={async () => {
            const exercise = exercises.find(ex => ex.exercise_name === selectedExercise);
            if (exercise) {
              const newTags = exercise.muscle_group.filter((t, i) => i !== idx);
              await window.electronAPI.upsertExerciseTags(selectedExercise, newTags);
              setExercises(exercises.map(ex =>
                ex.exercise_name === selectedExercise
              ? { ...ex, muscle_group: newTags }
              : ex
              ));
            }
              }}
            />
          ))}
            </Box>
          </Box>
        )}
        {/* Close Modal Button */}
        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
