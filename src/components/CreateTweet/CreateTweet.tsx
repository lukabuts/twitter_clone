import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTweetStore } from "@/stores";
import { ImageIcon, X, Globe, SmilePlus, GanttChartSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import type { AxiosProgressEvent } from "axios";

const MAX_CHARS = 280;
const MAX_IMAGES = 4;

const CreateTweet = () => {
  type FormValues = {
    content: string;
    images?: File[];
  };
  const { createTweet, isCreating } = useTweetStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleProgress = useCallback((progressEvent: AxiosProgressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / (progressEvent.total || 1)
    );
    setUploadProgress(percentCompleted);
  }, []);

  const { register, handleSubmit, watch, reset } = useForm<FormValues>({
    defaultValues: { content: "" },
  });

  const content = watch("content");
  const charsLeft = MAX_CHARS - content.length;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).slice(
        0,
        MAX_IMAGES - images.length
      );
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const onSubmit = async (data: { content: string }) => {
    const formData = new FormData();
    if (data.content) formData.append("content", data.content);

    images.forEach((image) => {
      formData.append("images[]", image);
    });

    try {
      await createTweet(formData, {
        onUploadProgress: handleProgress,
      });
      reset();
      setImages([]);
      setUploadProgress(0);
    } catch (error) {
      console.error("Error creating tweet:", error);
    }
  };

  const isSubmitDisabled =
    (!content && images.length === 0) || isCreating || charsLeft < 0;

  return (
    <div className="border-b border-gray-200 dark:border-gray-800 p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>

          <div className="flex-1 flex flex-col">
            {/* Textarea with Twitter-like styling */}
            <Textarea
              {...register("content", {
                maxLength: MAX_CHARS,
                validate: (value) =>
                  value.length > 0 ||
                  images.length > 0 ||
                  "Either content or images must be provided",
              })}
              placeholder="What's happening?!"
              className="min-h-[100px] border-0 text-lg focus-visible:ring-0 resize-none placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-900 dark:text-gray-100 bg-transparent p-2"
              disabled={isCreating}
              style={{
                lineHeight: "1.5rem",
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
              }}
            />

            {/* Image previews */}
            {images.length > 0 && (
              <div
                className={`grid gap-2 mt-3 rounded-2xl overflow-hidden ${
                  images.length === 1
                    ? "grid-cols-1"
                    : images.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-2"
                }`}
              >
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/70 transition"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Privacy and character count row */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-1 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                <Globe className="size-4" />
                <span className="text-xs font-medium">Everyone can reply</span>
              </div>

              {content.length > 0 && (
                <div className="flex items-center gap-1">
                  <span
                    className={`text-sm ${
                      charsLeft < 0
                        ? "text-red-500"
                        : charsLeft < 20
                        ? "text-yellow-500"
                        : "text-gray-500"
                    }`}
                  >
                    {charsLeft}
                  </span>
                </div>
              )}
            </div>

            {/* Progress bar */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <Progress value={uploadProgress} className="mt-3 h-0.5" />
            )}

            {/* Bottom toolbar */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
              <div className="flex gap-0">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full"
                  disabled={images.length >= MAX_IMAGES || isCreating}
                >
                  <ImageIcon className="size-5" />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                    multiple
                  />
                </button>

                <button
                  type="button"
                  className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full"
                >
                  <GanttChartSquare className="size-5" />
                </button>

                <button
                  type="button"
                  className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full"
                >
                  <SmilePlus className="size-5" />
                </button>
              </div>

              <Button
                type="submit"
                disabled={isSubmitDisabled}
                className="rounded-full px-4 bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold disabled:opacity-50"
              >
                {isCreating ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTweet;
