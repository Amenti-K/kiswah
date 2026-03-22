"use client";

import React, { useCallback, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { Upload, X, FileIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilePickerProps {
  name: string;
  control: Control<any>;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  maxSizeMB?: number; // default 10MB
  className?: string;
  accept?: string;
}

export default function FilePickerField({
  name,
  control,
  label = "Upload Document",
  helperText,
  disabled = false,
  maxSizeMB = 10,
  className,
  accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png",
}: FilePickerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileNamePreview, setFileNamePreview] = useState<string | null>(null);

  // When value exists and hasn't been parsed locally
  const initializePreview = (value: any) => {
    if (value instanceof File) {
      setFileNamePreview(value.name);
    } else if (typeof value === "string") {
      setFileNamePreview(value.split("/").pop() || "Attached File");
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, ...field },
        fieldState: { error },
      }) => {
        React.useEffect(() => {
          if (value && !fileNamePreview) {
             initializePreview(value);
          }
          if (!value) {
             setFileNamePreview(null);
          }
        }, [value]);

        const handleFileChange = (file?: File) => {
          if (!file) return;

          if (file.size > maxSizeMB * 1024 * 1024) {
             alert(`File size exceeds ${maxSizeMB}MB limit`);
             return;
          }

          setIsLoading(true);
          onChange(file); // RHF triggers update
          setFileNamePreview(file.name);
          setIsLoading(false);
        };

        const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setIsDragging(false);

          const file = e.dataTransfer.files?.[0];
          if (file) {
            handleFileChange(file);
          }
        }, []);

        const removeFile = () => {
          onChange(null);
          setFileNamePreview(null);
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
                fileNamePreview ? "p-4" : "p-6",
              )}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
            >
              {fileNamePreview ? (
                <div className="flex items-center justify-between bg-muted/40 p-3 rounded-md">
                   <div className="flex items-center space-x-3 truncate">
                      <FileIcon className="h-8 w-8 text-primary shrink-0" />
                      <div className="truncate">
                         <p className="text-sm font-medium truncate">{fileNamePreview}</p>
                         {value instanceof File && (
                             <p className="text-xs text-muted-foreground">
                                {(value.size / 1024 / 1024).toFixed(2)} MB
                             </p>
                         )}
                      </div>
                   </div>

                  {!disabled && (
                     <Button
                       type="button"
                       variant="ghost"
                       size="icon"
                       className="h-8 w-8 rounded-full sm:hover:bg-destructive sm:hover:text-destructive-foreground text-muted-foreground ml-2 shrink-0"
                       onClick={removeFile}
                     >
                       <X className="h-4 w-4" />
                     </Button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center space-y-3">
                  <div className="rounded-full bg-muted p-3">
                    {isLoading ? (
                       <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    ) : (
                       <Upload className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {isLoading ? "Processing..." : "Select Document or Drag here"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Max Size {maxSizeMB}MB
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={disabled || isLoading}
                    className="mt-2"
                    asChild
                  >
                    <label>
                      Browse
                      <input
                        type="file"
                        accept={accept}
                        className="hidden"
                        disabled={disabled || isLoading}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileChange(file);
                          e.target.value = "";
                        }}
                        {...field}
                        value={undefined} // Not controlling DOM value directly
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
