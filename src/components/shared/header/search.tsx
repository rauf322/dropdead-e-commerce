import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getAllCategories } from "@/lib/actions/product.actions";

export default async function Search() {
  const categories = await getAllCategories();
  return (
    <form action="/search" method="GET">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Select name="category">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="All" value="all">
              All
            </SelectItem>
            {categories.map((category) => (
              <SelectItem
                key={category.category.toUpperCase()}
                value={category.category.toLowerCase()}
              >
                {category.category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          name="q"
          type="text"
          placeholder="Search..."
          className="md:w-[100] lg:w-[300]"
        />
        <Button>
          <SearchIcon />
        </Button>
      </div>
    </form>
  );
}
