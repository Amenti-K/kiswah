"use client";

import React, { useCallback, useState, useEffect } from "react";
import { Control, Controller } from "react-hook-form";
import { Upload, X, Image as ImageIcon, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MultipleImagePickerProps {
  name: string;
  control: Control<any>;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  maxSizeMB?: number; // default 5MB
  className?: string;
  previewClassName?: string;
  accept?: string; // default "image/*"
  maxFiles?: number; // default 5
}

interface PreviewItem {
  id: string; // internal id for tracking
  url: string;
  file?: File; // if it's a newly added file
  isExisting?: boolean; // if it's an existing url from the backend
}

export default function MultipleImagePicker({
  name,
  control,
  label = "Upload Images",
  helperText,
  disabled = false,
  maxSizeMB = 5,
  className,
  previewClassName,
  accept = "image/*",
  maxFiles = 5,
}: MultipleImagePickerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<PreviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => {
        // Initialize previews from existing value array (useful for edits)
        useEffect(() => {
          if (Array.isArray(value) && previews.length === 0 && value.some(v => typeof v === "string")) {
            const initialPreviews = value
              .filter((v) => typeof v === "string")
              .map((url, i) => ({
                id: `existing-${i}`,
                url,
                isExisting: true,
              }));
            setPreviews(initialPreviews);
          } else if (!value || (Array.isArray(value) && value.length === 0)) {
              setPreviews([]);
          }
        }, [value]); // Note: In a real robust implementation, deep equality check is better here to avoid loops if value ref changes.

        const processFiles = async (files: FileList | File[]) => {
          const newFiles = Array.from(files);
          
          if (previews.length + newFiles.length > maxFiles) {
            alert(`You can only upload up to ${maxFiles} images.`);
            return;
          }

          setIsLoading(true);
          
          const validFiles = newFiles.filter(file => {
             if (file.size > maxSizeMB * 1024 * 1024) {
               alert(`File ${file.name} exceeds ${maxSizeMB}MB limit`);
               return false;
             }
             return true;
          });

          const newPreviews: PreviewItem[] = [];
          
          for (const file of validFiles) {
             const url = await new Promise<string>((resolve) => {
               const reader = new FileReader();
               reader.onloadend = () => resolve(reader.result as string);
               reader.readAsDataURL(file);
             });
             
             newPreviews.push({
               id: `new-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
               url,
               file
             });
          }

          const updatedPreviews = [...previews, ...newPreviews];
          setPreviews(updatedPreviews);
          
          // The form value should be just the new files if we are appending, 
          // but conventionally we pass all custom files + maybe keep existing urls.
          // For multipart form, we usually only send the newly added files.
          // If we need to send the existing URLs as well to persist them, we'd map them here.
          // Let's pass the mixed array of Strings (existing URLs) and Files.
          const newFormValue = updatedPreviews.map(p => p.isExisting ? p.url : p.file);
          onChange(newFormValue);
          
          setIsLoading(false);
        };

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files?.length) {
            processFiles(e.target.files);
          }
          e.target.value = ""; // reset
        };

        const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setIsDragging(false);

          if (e.dataTransfer.files?.length) {
            // Filter only images
            const imageFiles = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
            processFiles(imageFiles);
          }
        }, [previews]);

        const removeImage = (idToRemove: string) => {
          const updatedPreviews = previews.filter(p => p.id !== idToRemove);
          setPreviews(updatedPreviews);
          const newFormValue = updatedPreviews.map(p => p.isExisting ? p.url : p.file);
          onChange(newFormValue.length ? newFormValue : undefined);
        };

        return (
          <div className={cn("space-y-4", className)}>
            {label && (
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label} {previews.length > 0 && `(${previews.length}/${maxFiles})`}
              </label>
            )}

            <div
              className={cn(
                "border-2 border-dashed rounded-lg overflow-hidden transition-colors flex flex-col items-center justify-center min-h-[200px]",
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50",
                error && "border-destructive",
                disabled && "opacity-60 pointer-events-none",
                previews.length >= maxFiles && "opacity-50"
              )}
              onDragOver={(e) => {
                e.preventDefault();
                if (previews.length < maxFiles) setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                  if (previews.length < maxFiles) onDrop(e);
                  else e.preventDefault();
              }}
            >
              {previews.length === 0 ? (
                <div className="flex flex-col items-center text-center space-y-3 p-8">
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
                        : "Drop images here or click to browse"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, WEBP up to {maxSizeMB}MB (Max {maxFiles})
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={disabled || isLoading || previews.length >= maxFiles}
                    className="mt-2 gap-2"
                    asChild
                  >
                    <label>
                      <ImageIcon className="h-4 w-4" />
                      Choose Images
                      <input
                        type="file"
                        accept={accept}
                        multiple
                        className="hidden"
                        disabled={disabled || isLoading || previews.length >= maxFiles}
                        onChange={handleFileChange}
                      />
                    </label>
                  </Button>
                </div>
              ) : (
                <div className="w-full flex-col p-4 w-full">
                  <div className="flex flex-wrap gap-4 items-center justify-start w-full">
                    {previews.map((preview) => (
                      <div key={preview.id} className="relative group w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden border border-border bg-muted shadow-sm transition-transform hover:scale-105">
                        <img
                          src={preview.url}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        {!disabled && (
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="h-8 w-8 rounded-md"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                removeImage(preview.id);
                              }}
                            >
                              <X className="h-5 w-5" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}

                    {previews.length < maxFiles && !disabled && (
                      <label className="relative flex flex-col items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-colors">
                        {isLoading ? (
                          <Loader2 className="h-6 w-6 animate-spin text-primary mb-2" />
                        ) : (
                          <Plus className="h-6 w-6 text-muted-foreground mb-2" />
                        )}
                        <span className="text-xs font-medium text-muted-foreground">Add More</span>
                        <input
                          type="file"
                          accept={accept}
                          multiple
                          className="hidden"
                          disabled={isLoading}
                          onChange={handleFileChange}
                        />
                      </label>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Previews are now embedded inside the dropzone */}

            {(error || helperText) && (
              <p
                className={cn(
                  "text-sm mt-2",
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
