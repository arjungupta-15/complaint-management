import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  Chip,
  Divider,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
} from "@mui/lab";
import {
  Email,
  Apartment,
  AccessTime,
  CheckCircle,
  HourglassEmpty,
} from "@mui/icons-material";

// Mock complaints
const mockComplaints = [
  {
    id: "ABC123",
    department: "Sanitation",
    email: "user@example.com",
    status: "in progress",
    description: "Overflowing garbage bin near Block C.",
    location: "Block C, Greenfield Society",
    priority: "high",
    createdAt: "2024-07-28",
    updatedAt: "2024-07-30",
    resolvedAt: null,
  },
  {
    id: "XYZ789",
    department: "Water Supply",
    email: "resident2@example.com",
    status: "resolved",
    description: "Low water pressure since 3 days.",
    location: "Sector 12, Townview",
    priority: "medium",
    createdAt: "2024-07-25",
    updatedAt: "2024-07-28",
    resolvedAt: "2024-07-29",
  },
];

// Utility functions
const getStatusColor = (status) => {
  switch (status) {
    case "resolved":
      return "success";
    case "in progress":
      return "warning";
    default:
      return "default";
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "error";
    case "medium":
      return "warning";
    default:
      return "default";
  }
};

const getPriorityIcon = (priority) => {
  switch (priority) {
    case "high":
      return <CheckCircle />;
    case "medium":
      return <HourglassEmpty />;
    default:
      return <AccessTime />;
  }
};

const getTimelineEvents = (complaint) => {
  const events = [
    {
      title: "Complaint Registered",
      description: complaint.description,
      time: complaint.createdAt,
      icon: <CheckCircle />,
      color: "primary",
    },
  ];

  if (complaint.status === "in progress") {
    events.push({
      title: "In Progress",
      description: "Your complaint is currently being addressed.",
      time: complaint.updatedAt,
      icon: <HourglassEmpty />,
      color: "warning",
    });
  }

  if (complaint.status === "resolved") {
    events.push(
      {
        title: "In Progress",
        description: "Your complaint was being worked on.",
        time: complaint.updatedAt,
        icon: <HourglassEmpty />,
        color: "warning",
      },
      {
        title: "Resolved",
        description: "Issue resolved successfully.",
        time: complaint.resolvedAt,
        icon: <CheckCircle />,
        color: "success",
      }
    );
  }

  return events;
};

const TrackComplaint = () => {
  const [trackingId, setTrackingId] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTrack = () => {
    const result = mockComplaints.find(
      (c) => c.id === trackingId.trim().toUpperCase()
    );

    if (result) {
      setComplaint(result);
      setError("");
    } else {
      setComplaint(null);
      setError("Complaint not found. Please check the Tracking ID.");
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        sx={{ mb: 4 }}
      >
      
      </Typography>

<Card sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 4 }}>
  <Typography
    variant="h4"
    fontWeight="bold"
    textAlign="center"
    sx={{ mb: 3 }}
  >
    🛠️ Track Your Complaint
  </Typography>

  <Stack
    direction={isMobile ? "column" : "row"}
    spacing={2}
    justifyContent="center"
    alignItems="center"
  >
    <TextField
      label="Enter Tracking ID"
      value={trackingId}
      onChange={(e) => setTrackingId(e.target.value)}
      variant="outlined"
      sx={{ flex: 1, minWidth: 250 }}
    />
    <Button
      variant="contained"
      onClick={handleTrack}
      size="large"
      sx={{ px: 4 }}
    >
      Track
    </Button>
  </Stack>

  {error && (
    <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
      {error}
    </Typography>
  )}
</Card>


      {complaint && (
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            📝 Complaint Details
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2">Tracking ID</Typography>
              <Typography variant="body1">{complaint.id}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2">Department</Typography>
              <Typography variant="body1">
                <Apartment sx={{ mr: 1, verticalAlign: "middle" }} />
                {complaint.department}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2">Registered Email</Typography>
              <Typography variant="body1">
                <Email sx={{ mr: 1, verticalAlign: "middle" }} />
                {complaint.email}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2">Location</Typography>
              <Typography variant="body1">{complaint.location}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2">Description</Typography>
              <Typography variant="body1">{complaint.description}</Typography>
            </Box>

            <Stack direction="row" spacing={2} mt={2}>
              <Chip
                label={`Status: ${complaint.status.toUpperCase()}`}
                color={getStatusColor(complaint.status)}
              />
              <Chip
                icon={getPriorityIcon(complaint.priority)}
                label={`Priority: ${complaint.priority.toUpperCase()}`}
                color={getPriorityColor(complaint.priority)}
              />
            </Stack>

            <Box>
              <Typography variant="h6" fontWeight="bold" mt={4} mb={2}>
                📅 Complaint Timeline
              </Typography>

              <Timeline position="alternate">
                {getTimelineEvents(complaint).map((event, index) => (
                  <TimelineItem key={index}>
                    <TimelineOppositeContent
                      sx={{
                        flex: 0.2,
                        color: "text.secondary",
                        fontSize: "0.8rem",
                        textAlign: "right",
                      }}
                    >
                      {event.time}
                    </TimelineOppositeContent>

                    <TimelineSeparator>
                      <TimelineDot
                        color={event.color}
                        sx={{ boxShadow: 2, width: 18, height: 18 }}
                      >
                        {event.icon}
                      </TimelineDot>
                      {index < getTimelineEvents(complaint).length - 1 && (
                        <TimelineConnector sx={{ bgcolor: "grey.400" }} />
                      )}
                    </TimelineSeparator>

                    <TimelineContent sx={{ py: 1 }}>
                      <Card
                        variant="outlined"
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          backgroundColor: "#f9fafb",
                          boxShadow: 1,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          gutterBottom
                          sx={{ color: "text.primary" }}
                        >
                          {event.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {event.description}
                        </Typography>
                      </Card>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Box>
          </Stack>
        </Card>
      )}
    </Box>
  );
};

export default TrackComplaint;
