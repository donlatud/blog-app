import { apiClient, toApiError } from "../client";

type UploadResponse = {
  data: {
    url: string;
  };
};

export async function uploadAdminImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const { data } = await apiClient.post<UploadResponse>(
      "/api/admin/uploads",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data.data.url;
  } catch (error) {
    throw toApiError(error);
  }
}
