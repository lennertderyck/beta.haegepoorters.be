"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { cn } from "@/lib/utils/composers";
import { FC } from "react";
import Icon from "../Icon/Icon";

interface WithIntent {
  intent: "blocking" | "optional";
}

const Dialog: FC<DialogPrimitive.Root.Props> = ({ ...otherProps }) => {
  return <DialogPrimitive.Root data-slot="dialog" {...otherProps} />;
};

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

const DialogOverlay: FC<DialogPrimitive.Backdrop.Props & WithIntent> = ({
  className,
  intent,
  ...props
}) => {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      data-intent={intent}
      className={cn(
        "fixed inset-0",
        "",
        "md:data-[intent=optional]:inset-s-(--dialog-optional-intent-inset-start)",
        "data-[intent=blocking]:bg-black/50 data-[intent=blocking]:supports-backdrop-filter:backdrop-blur-xs",
        "data-[intent=optional]:bg-white/20 data-[intent=optional]:supports-backdrop-filter:backdrop-blur-xs",
        "isolate z-50",
        // "data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 duration-100",
        className
      )}
      {...props}
    />
  );
};

interface DialogContentProps extends DialogPrimitive.Popup.Props, WithIntent {
  showCloseButton?: boolean;
}

const DialogContent: FC<DialogContentProps> = ({
  className,
  children,
  showCloseButton = true,
  intent,
  ...props
}) => {
  return (
    <DialogPortal>
      <DialogOverlay intent={intent} />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        data-intent={intent}
        className={cn(
          "fixed top-1/2 left-1/2 md:left-[calc(50%+(var(--dialog-optional-intent-inset-start)/2))]",
          "grid gap-4",
          "sm:max-w-sm max-w-[calc(100%-2rem)] w-full -translate-x-1/2 -translate-y-1/2",
          "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          "p-8 bg-white outline-none rounded-lg duration-100 z-50",
          "data-[intent=optional]:shadow-md",
          "data-[intent=blocking]:shadow-xl",
          "border border-neutral-100",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <button className="absolute top-2 right-2">
                <Icon name="close-line" />
                <span className="sr-only">Close</span>
              </button>
            }
          />
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
};

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<button>Close</button>} />
      )}
    </div>
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("font-serif text-2xl font-bold leading-none", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("", className)}
      {...props}
    />
  );
}

export default Dialog;
export {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger
};
