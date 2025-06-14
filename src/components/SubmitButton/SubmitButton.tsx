import type { ReactNode } from "react";
import { Button } from "../ui/button";

const SubmitButton = ({
  children,
  isDisabled,
}: {
  children: ReactNode;
  isDisabled: boolean;
}) => {
  return (
    <Button type="submit" className="w-full relative" disabled={isDisabled}>
      <span>{children}</span>
      {isDisabled && (
        <div className="absolute top-1/2 left-4 -translate-x-1/2 -translate-y-1/2 z-50 ">
          <div className="size-5 border-2 border-transparent border-t-current rounded-full animate-spin"></div>
        </div>
      )}
    </Button>
  );
};

export default SubmitButton;
