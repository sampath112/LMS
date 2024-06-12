import { useState } from "react"
import { Box, Typography, TextField, Button } from "@mui/material"
import { useUser } from "../context/user-context"



export const Register = () => {
  const { registerUser } = useUser()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  })
  const [error, setError] = useState("")

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.")
      return
    }
    registerUser(formData.username, formData.password, formData.email)
      .then(() => {
        setError("")
        setFormData({ username: "", password: "", confirmPassword: "", email: "" })
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Box sx={{ p: 4, width: "500px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Register
        </Typography>
        {error && (
          <Typography variant="subtitle1" color="red" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}
