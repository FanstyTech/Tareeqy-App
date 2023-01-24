// import * as Yup from "yup";
import { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
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
  CreateAccountAsync: (obj: any) => void;
}
const RegisterForm: React.FC<LoginFormProps> = ({ CreateAccountAsync }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  // const history = useHistory();

  const formSubmitHandle = (event: any) => {
    var obj = {
      Email: email,
      NickName: nickName,
      Password: password,
    };
    // history.push("/Login");

    CreateAccountAsync(obj);
    event.preventDefault();
  };
  return (
    <form autoComplete="off" onSubmit={formSubmitHandle}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          type="text"
          label="Nick Name"
          required
          onChange={(e) => {
            setNickName(e.target.value);
          }}
        />

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
          Sign Up
        </Button>
      </Box>
    </form>
  );
};

export default RegisterForm;
