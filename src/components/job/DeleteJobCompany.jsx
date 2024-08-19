import React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";

const DeleteModalJob = ({ open, onClose, onConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="delete-confirmation-modal"
      aria-describedby="delete-confirmation-description"
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="delete-confirmation-modal" variant="h6" component="h2">
          Bạn có chắc chắn xóa công việc này?
        </Typography>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="error"
            sx={{ width: "48%" }}
            onClick={() => {
              onConfirm(); // Call the delete handler
            }}
          >
            Xác nhận
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{ width: "48%" }}
            onClick={onClose}
          >
            Hủy bỏ
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModalJob;
