import { showNotificationToast } from "@/common/utils/toast";

/** Upload File To Server */
export async function uploadFileToServer({
  axios,
  file,
  state,
  selectedImage,
  toast,
  t,
}: {
  axios: any;
  file: any;
  state: any;
  selectedImage: any;
  toast: any;
  t: any;
}): Promise<any> {
  state.btnLoading = true;
  try {
    let formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      import.meta.env.VITE_APP_BASE_API_URL + "customer/upload-file",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    selectedImage.value = response.data?.filename;
    state.btnLoading = false;
  } catch (error) {
    await showNotificationToast({
      toast,
      error: "error",
      summary: t("toast.summary.error"),
      detail: error,
    });
  }
}
