export function getFieldErrors(errors: unknown[]) {
  return errors.flatMap((error) => {
    if (!error) return [];
    if (typeof error === "string") return [{ message: error }];
    if (typeof error === "object" && "message" in error) {
      return [{ message: String((error as { message: unknown }).message) }];
    }

    return [{ message: "Giá trị chưa hợp lệ." }];
  });
}
