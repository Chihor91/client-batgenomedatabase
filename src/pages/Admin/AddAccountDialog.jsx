import * as React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSnackbar } from "notistack";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

export default function AddAccountDialog({ open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    axios
      .post("user/account/", data)
      .then((res) => {
        enqueueSnackbar("Account successfully created.", {
          variant: "success",
          autoHideDuration: 2000,
        });
        reset();
        onClose();
      })
      .catch((error) => {
        enqueueSnackbar("Failed to create the account. Please try again.", {
          variant: "error",
          autoHideDuration: 2000,
        });
        console.log(error);
      });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, color: "#2e7d32" }}>
        Add New Account
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              {...register("username", {
                required: "Please fill out this field",
              })}
              label="Username"
              placeholder="Username"
              size="small"
              fullWidth
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              {...register("email", {
                required: "Please fill out this field",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/,
                  message: "Invalid email format",
                },
              })}
              label="Email Address"
              placeholder="Email Address"
              size="small"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              {...register("password", {
                required: "Please fill out this field",
              })}
              label="Password"
              placeholder="Password"
              type="password"
              size="small"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              {...register("re_password", {
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              label="Repeat Password"
              placeholder="Repeat Password"
              type="password"
              size="small"
              fullWidth
              error={!!errors.re_password}
              helperText={errors.re_password?.message}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Add Account
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
