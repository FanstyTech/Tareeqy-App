// import * as Yup from "yup";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Button,
  Box,
} from "@mui/material";
import React from "react";
import { useSnackbar, VariantType } from "notistack";

// ----------------------------------------------------------------------

interface LoginFormProps {
  login: (obj: any) => void;
}
const LoginForm: React.FC<LoginFormProps> = ({ login }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandle = (event: any) => {
    var obj = {
      Email: email,
      Password: password,
    };

    login(obj);
    event.preventDefault();
  };
  return (
    <form autoComplete="off" onSubmit={formSubmitHandle}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          type="email"
          label="Email address"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          label="Password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Box sx={{ padding: "24px 0" }}>
        <Button
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="outlined"
        >
          Login
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
