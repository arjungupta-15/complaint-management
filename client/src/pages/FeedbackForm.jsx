import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  Divider,
} from "@mui/material";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <Box sx={{ backgroundColor: "#f9fafc", minHeight: "100vh", py: 5 }}>
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: "white",
            boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
            Feedback & Resolution
          </Typography>
          <Divider sx={{ my: 2 }} />

          <form method="POST" action="/submit_feedback.php">
            <TextField
              fullWidth
              label="Complaint ID"
              name="complaint-id"
              required
              margin="normal"
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Feedback"
              name="feedback"
              multiline
              rows={4}
              required
              margin="normal"
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Resolution"
              name="resolution"
              multiline
              rows={4}
              required
              margin="normal"
              variant="outlined"
            />

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Rate your resolution:
              </Typography>
              <Box sx={{ display: "flex", gap: 1, fontSize: "2rem" }}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    onClick={() => handleStarClick(value)}
                    style={{
                      cursor: "pointer",
                      color: rating >= value ? "#FFD700" : "#ccc",
                      transition: "color 0.2s",
                    }}
                  >
                    {rating >= value ? "★" : "☆"}
                  </span>
                ))}
              </Box>
            </Box>

            <input type="hidden" name="rating" value={rating} />

            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#0a4482",
                  px: 5,
                  py: 1.5,
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#003c7a" },
                }}
              >
                Submit Feedback
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default FeedbackForm;
