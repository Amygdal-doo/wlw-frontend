import { useSettings } from "providers/SettingsProvider";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Separator } from "./ui/separator";
import { CustomizeChatAIForm } from "./CustomizeChatAIForm";
import { useState } from "react";

export function CustomizeChatAIDialog() {
  const { fetchInstructions, instructions } = useSettings();
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="px-2 h-8 w-full py-1.5 flex justify-start text-sm text-popover-foreground font-normal"
          variant="ghost"
          onClick={() => {
            if (instructions) {
              fetchInstructions();
            }
          }}
        >
          <span> Customize Chat AI</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Customize Chat AI</DialogTitle>
          <Separator />
        </DialogHeader>
        <CustomizeChatAIForm closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  );
}
