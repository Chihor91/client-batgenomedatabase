import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function MultipleIsolateFormTest() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Open the file picker
  useEffect(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    // Go back if user cancels the operation
    if (!file) {
      navigate(-1);
      return;
    }

    // Prepare the file for upload
    const form_data = new FormData();
    form_data.append("isolates", file);

    // Upload the file
    axios
      .post(axios.defaults.baseURL + "/source/isolate/add/file/", form_data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        const results = res.data.results ?? [];
        const errors = results.filter((r) => !r.success);
        const successCount = results.length - errors.length;

        // Show results via snackbar notification
        enqueueSnackbar(
          `${successCount} of ${results.length} rows uploaded successfully.`,
          {
            variant: successCount === results.length ? "success" : "warning",
          },
        );

        if (errors.length > 0) {
          enqueueSnackbar(`${errors.length} row(s) failed to upload.`, {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar(
          err?.response?.data?.message ??
            "An error occurred while uploading the file.",
          { variant: "error" },
        );
      })
      .finally(() => {
        navigate(-1);
      });
  };

  return (
    <input
      ref={fileInputRef}
      type="file"
      accept=".csv"
      style={{ display: "none" }}
      onChange={handleFileChange}
    />
  );
}
