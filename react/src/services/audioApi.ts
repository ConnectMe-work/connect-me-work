import { AxiosProgressEvent } from "axios";
import axiosInstance from "src/services/axiosInstance";
import { showErrorMessage } from "src/utils/alert";


export function sendAudioStandalone({
  audioBlob,
  lang,
  setUploading,
  setUploadProgress,
  onAudioConverted,
}: {
  audioBlob: Blob;
  lang: string;
  setUploading: (v: boolean) => void;
  setUploadProgress: (v: number) => void;
  onAudioConverted: (text: string) => void;
}): { controller: AbortController; promise: Promise<void> } | void {
  if (!audioBlob) return;

  const controller = new AbortController();
  const formData = new FormData();
  ///order important, first shold be not audio fields
  formData.append("lng", lang);
  formData.append("data", audioBlob, "voice.webm");

  setUploading(true);

  const promise = axiosInstance
    .post("/v1/connect/audio", formData, {
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        );
        setUploadProgress(percent);
      },
      responseType: "json",
      signal: controller.signal,
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      timeout: 0, // Disable client-side timeout
    })
    .then((res: any) => {
      const text = res?.data?.text;
      if (text) onAudioConverted(text);
    })
    .catch((error: any) => {
      if (controller.signal.aborted) {
        showErrorMessage("Upload aborted");
      } else {
        showErrorMessage("Failed to upload");
      }
    })
    .finally(() => {
      setUploading(false);
      setUploadProgress(0);
    });

  // Return both controller and promise
  return { controller, promise };
}
