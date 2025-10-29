export function objectToFormData(
  formData: FormData,
  key: string,
  data: unknown
): void {
  if (data instanceof File || data instanceof Blob) {
    formData.append(key, data);
  } else if (Array.isArray(data)) {
    if (
      data.length > 0 &&
      (data[0] instanceof File || data[0] instanceof Blob)
    ) {
      data.forEach((file) => {
        formData.append(key, file);
      });
    } else {
      data.forEach((value, index) => {
        if (
          typeof value === "object" &&
          value !== null &&
          !(value instanceof File || value instanceof Blob)
        ) {
          objectToFormData(formData, `${key}[${index}]`, value);
        } else {
          formData.append(`${key}[${index}]`, String(value));
        }
      });
    }
  } else if (typeof data === "object" && data !== null) {
    Object.keys(data as Record<string, unknown>).forEach((subKey) => {
      objectToFormData(
        formData,
        `${key}[${subKey}]`,
        (data as Record<string, unknown>)[subKey]
      );
    });
  } else if (data !== undefined && data !== null) {
    formData.append(key, String(data));
  }
}
