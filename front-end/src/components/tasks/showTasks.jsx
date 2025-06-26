import { Card, CardContent, Skeleton, Stack, Typography } from "@mui/material";

const ShowTasks = ({ column, isLoading, setOpenViewTask, setSelectedTask }) => {
  return (
    <Stack spacing={2}>
      {(isLoading ? Array.from({ length: 2 }) : column?.tasks || []).map(
        (task, taskIdx) => {
          console.log(task, "tasktask");

          const completedSubtasks =
            task?.subtasks?.filter((st) => st.is_completed)?.length || 0;
          const totalSubtasks = task?.subtasks?.length || 0;

          return (
            <Card
              key={task?.id || taskIdx}
              sx={{
                borderRadius: 2,
                boxShadow: 1,
                backgroundColor: "var(--appbar-bg-color)",
                cursor: "pointer",
              }}
              onClick={() => {
                setOpenViewTask(true);
                setSelectedTask(task);
              }}
            >
              <CardContent>
                {isLoading ? (
                  <>
                    <Skeleton
                      animation="wave"
                      height={20}
                      width="80%"
                      sx={{ mb: 1 }}
                    />
                    <Skeleton animation="wave" height={14} width="60%" />
                  </>
                ) : (
                  <>
                    <Typography
                      sx={{
                        color: "var(--appbar-text-color)",
                        mb: 1,
                        fontSize: "15px",
                        fontFamily: "PlusJakartaSans Medium",
                      }}
                    >
                      {task?.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontFamily: "PlusJakartaSans Medium",
                        color: "var(--grey-color)",
                      }}
                    >
                      {completedSubtasks} of {totalSubtasks} subtasks
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
          );
        }
      )}
    </Stack>
  );
};

export default ShowTasks;
