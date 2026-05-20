import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

const SearchItem = () => {
  return (
    <div className="p-3">
      <InputGroup className="max-w-xs h-10 p-2">
        <InputGroupInput placeholder="Search item" />
        <InputGroupAddon></InputGroupAddon>
        <Search color="grey" />
      </InputGroup>
    </div>
  );
};

export default SearchItem;
