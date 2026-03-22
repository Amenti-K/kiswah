"use client";

import React, { useCallback, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImagePickerProps {
  name: string;
  control: Control<any>;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  maxSizeMB?: number; // default 5MB
  className?: string;
  previewClassName?: string;
  accept?: string; // default "image/*"
}

export default function ImagePicker({
  name,
  control,
  label = "Upload Image",
  helperText,
  disabled = false,
  maxSizeMB = 5,
  className,
  previewClassName,
  accept = "image/*",
}: ImagePickerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Helper to create preview
  const createPreview = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, ...field },
        fieldState: { error },
      }) => {
        // If there's an initial value (e.g. URL from backend)
        React.useEffect(() => {
          if (value && typeof value === "string" && !previewUrl) {
            setPreviewUrl(value);
          }
        }, [value]);

        const handleFileChange = (file?: File) => {
          if (!file) return;

          if (file.size > maxSizeMB * 1024 * 1024) {
            // You might want to use toast here instead
            alert(`File size exceeds ${maxSizeMB}MB limit`);
            return;
          }

          setIsLoading(true);
          onChange(file); // ← this is what RHF will send
          createPreview(file);
        };

        const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setIsDragging(false);

          const file = e.dataTransfer.files?.[0];
          if (file && file.type.startsWith("image/")) {
            handleFileChange(file);
          }
        }, []);

        const removeImage = () => {
          onChange(null);
          setPreviewUrl(null);
        };

        return (
          <div className={cn("space-y-2", className)}>
            {label && (
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
              </label>
            )}

            <div
              className={cn(
                "border-2 border-dashed rounded-lg overflow-hidden transition-colors",
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50",
                error && "border-destructive",
                disabled && "opacity-60 pointer-events-none",
                previewUrl ? "p-1.5" : "p-8",
              )}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
            >
              {previewUrl ? (
                <div className="relative group">
                  <div
                    className={cn(
                      "relative rounded-md overflow-hidden bg-muted/40",
                      previewClassName,
                    )}
                  >
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-auto max-h-[320px] object-contain mx-auto"
                    />

                    {!disabled && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="h-9 w-9 rounded-full"
                          onClick={removeImage}
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Small filename / size info */}
                  {value instanceof File && (
                    <p className="mt-2 text-xs text-muted-foreground text-center">
                      {value.name} • {(value.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center space-y-3">
                  <div className="rounded-full bg-muted p-4">
                    {isLoading ? (
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    ) : (
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {isLoading
                        ? "Processing..."
                        : "Drop image here or click to browse"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, WEBP up to {maxSizeMB}MB
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={disabled || isLoading}
                    className="mt-2 gap-2"
                    asChild
                  >
                    <label>
                      <ImageIcon className="h-4 w-4" />
                      Choose Image
                      <input
                        type="file"
                        accept={accept}
                        className="hidden"
                        disabled={disabled || isLoading}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileChange(file);
                          e.target.value = ""; // reset input
                        }}
                        {...field}
                        value={undefined} // important – we don't want to control file input value
                      />
                    </label>
                  </Button>
                </div>
              )}
            </div>

            {(error || helperText) && (
              <p
                className={cn(
                  "text-sm",
                  error ? "text-destructive" : "text-muted-foreground",
                )}
              >
                {error ? error.message : helperText}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
