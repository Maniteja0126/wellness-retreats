import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent, Button, Input } from "./ui";
import { useState, useCallback } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import debounce from "lodash/debounce";

interface SearchBarProps {
  handleSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleOpen = () => setDialogOpen(true);

  const handleClose = () => {
    setDialogOpen(false);
    setInput("");
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.code === "KeyK" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      setDialogOpen(true);
    }else if (event.code === "Enter") {
      event.preventDefault();
      handleClose();
    }
  };

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      handleSearch(searchTerm);
    }, 500),
    [handleSearch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    // console.log("Input changed:", searchTerm);
    setInput(searchTerm);
    debouncedSearch(searchTerm);

  };

  return (
    <div>
      <Button variant="outline" className="pr-2" onClick={handleOpen}>
        <div className="items-center hidden gap-2 md:flex">
          <MagnifyingGlassIcon className="h-[1.2rem] w-[1.2rem]" />
          Search...
          <kbd className="bg-white/15 p-1.5 rounded-sm text-xs leading-3">
            {}
          </kbd>
        </div>
        <div className="block md:hidden">
          <MagnifyingGlassIcon className="h-[1.2rem] w-[1.2rem]" />
        </div>
      </Button>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl p-0">
          <DialogTitle className="sr-only">Search Dialog</DialogTitle>
          <div className="flex items-center px-4 py-2 border-b">
            <MagnifyingGlassIcon className="h-[1.5rem] w-[1.5rem]" />
            <Input
              type="text"
              placeholder="Type title"
              className="text-base border-none shadow-none focus-visible:outline-none focus-visible:ring-0"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button type="button" className="ml-2" onClick={handleClose}>
              <Cross2Icon className="w-4 h-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchBar;
