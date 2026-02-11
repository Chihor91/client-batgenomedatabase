import { Box, Typography, Stack } from "@mui/material";

const DetailRow = ({ label, value }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      bgcolor: "#5a660312",
      p: 2,
      borderRadius: 2,
      width: "100%",
    }}
  >
    <Typography color="text.secondary" fontSize={15}>
      {label}
    </Typography>
    <Typography sx={{ fontFamily: "monospace" }} fontSize={15}>
      {value || "N/A"}
    </Typography>
  </Box>
);

export default function DetailSection({ icon, title, rows }) {
  return (
    <>
      <Box sx={{ display: "flex", gap: 1, mt: 2, color: "#454f02" }}>
        {icon}
        <Typography variant="h6">{title}</Typography>
      </Box>

      <Stack spacing={1} sx={{ mt: 2, width: "100%" }}>
        {rows.map((row, index) => (
          <DetailRow key={index} label={row.label} value={row.value} />
        ))}
      </Stack>
    </>
  );
}
