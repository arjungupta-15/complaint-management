import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Chip,
  Divider,
} from "@mui/material";

// 💾 Dummy complaint data
const dummyComplaints = [
  {
    id: 1,
    tracking_id: "CMP123456",
    email: "student1@example.com",
    category: "Electricity",
    status: "pending",
    created_at: "2025-07-25",
  },
  {
    id: 2,
    tracking_id: "CMP654321",
    email: "student2@example.com",
    category: "Water Supply",
    status: "resolved",
    created_at: "2025-07-20",
  },
  {
    id: 3,
    tracking_id: "CMP888999",
    email: "student3@example.com",
    category: "Wi-Fi",
    status: "in progress",
    created_at: "2025-07-27",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "resolved":
      return "success";
    case "in progress":
      return "warning";
    case "pending":
      return "default";
    default:
      return "info";
  }
};

const StudentDashboard = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // simulate fetch
    setTimeout(() => {
      setComplaints(dummyComplaints);
    }, 500);
  }, []);

  const handleAction = (id, action) => {
    const name = dummyComplaints.find((c) => c.id === id)?.tracking_id;
    if (action === "reopen") {
      alert(`Complaint ${name} reopened.`);
    } else if (action === "escalate") {
      alert(`Complaint ${name} escalated.`);
    }
  };

  return (
    <Box sx={{ bgcolor: "#f4f7fa", minHeight: "100vh", py: 5 }}>
      <Container maxWidth="lg">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            backgroundColor: "#ffffff",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#0a3d62" }}
          >
            🎓 Student Dashboard
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ mb: 3, color: "#34495e" }}>
            My Complaints
          </Typography>

          <Table sx={{ borderRadius: 2 }}>
            <TableHead sx={{ backgroundColor: "#ecf0f1" }}>
              <TableRow>
                <TableCell><b>ID</b></TableCell>
                <TableCell><b>Tracking ID</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Category</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Created At</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaints.map((complaint) => (
                <TableRow key={complaint.id} hover>
                  <TableCell>{complaint.id}</TableCell>
                  <TableCell>{complaint.tracking_id}</TableCell>
                  <TableCell>{complaint.email}</TableCell>
                  <TableCell>{complaint.category}</TableCell>
                  <TableCell>
                    <Chip
                      label={complaint.status.toUpperCase()}
                      color={getStatusColor(complaint.status)}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{complaint.created_at}</TableCell>
                  <TableCell>
                    <FormControl fullWidth size="small">
                      <InputLabel>Action</InputLabel>
                      <Select
                        defaultValue=""
                        onChange={(e) =>
                          handleAction(complaint.id, e.target.value)
                        }
                        label="Action"
                      >
                        <MenuItem value="">Select Action</MenuItem>
                        <MenuItem value="reopen">Reopen</MenuItem>
                        <MenuItem value="escalate">Escalate</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </Box>
  );
};

export default StudentDashboard;
