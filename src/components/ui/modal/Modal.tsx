"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ModalContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModalContext = React.createContext<ModalContextValue | null>(null);

function useModal() {
  const ctx = React.useContext(ModalContext);
  if (!ctx) throw new Error("Modal components must be used within Modal");
  return ctx;
}

interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function Modal({ open = false, onOpenChange, children }: ModalProps) {
  const [openState, setOpenState] = React.useState(open);
  const isControlled = open !== undefined && onOpenChange !== undefined;
  const isOpen = isControlled ? open : openState;
  const setIsOpen = isControlled ? onOpenChange! : setOpenState;

  React.useEffect(() => {
    if (isControlled) setIsOpen(open);
  }, [open, isControlled, setIsOpen]);

  return (
    <ModalContext.Provider
      value={{ open: isOpen, onOpenChange: setIsOpen }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function ModalTrigger({
  children,
  asChild,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) {
  const { onOpenChange } = useModal();
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
      onClick: () => onOpenChange(true),
    });
  }
  return (
    <button type="button" onClick={() => onOpenChange(true)}>
      {children}
    </button>
  );
}

function ModalPortal({ children }: { children: React.ReactNode }) {
  const { open } = useModal();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {children}
    </div>
  );
}

function ModalOverlay({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { onOpenChange } = useModal();
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      onClick={() => onOpenChange(false)}
      {...props}
    />
  );
}

function ModalContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative z-50 grid w-full max-w-lg gap-4 border border-border bg-background p-6 shadow-lg rounded-lg",
        className
      )}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {children}
    </div>
  );
}

function ModalHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function ModalFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...props}
    />
  );
}

function ModalTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

function ModalDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}

function ModalClose({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = useModal();
  return (
    <button
      type="button"
      className={className}
      onClick={() => onOpenChange(false)}
      {...props}
    >
      {children ?? "Close"}
    </button>
  );
}

export {
  Modal,
  ModalTrigger,
  ModalPortal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
};
