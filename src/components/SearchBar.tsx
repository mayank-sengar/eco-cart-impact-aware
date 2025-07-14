import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (categories: string[]) => void;
  onCarbonFilter: (level: string | null) => void;
  selectedCategories: string[];
  carbonFilter: string | null;
  availableCategories: string[];
}

export const SearchBar = ({
  onSearch,
  onCategoryFilter,
  onCarbonFilter,
  selectedCategories,
  carbonFilter,
  availableCategories,
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      onCategoryFilter([...selectedCategories, category]);
    } else {
      onCategoryFilter(selectedCategories.filter(c => c !== category));
    }
  };

  const carbonLevels = [
    { value: "Low", label: "Low Impact (≤5 kg CO₂)", color: "success" },
    { value: "Medium", label: "Medium Impact (5-15 kg CO₂)", color: "warning" },
    { value: "High", label: "High Impact (>15 kg CO₂)", color: "destructive" },
  ];

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search for eco-friendly products..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-10 h-12 text-lg"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Category Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Categories</span>
              {selectedCategories.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {selectedCategories.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {availableCategories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked)}
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Carbon Impact Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2">
              <span>🌱</span>
              <span>Carbon Impact</span>
              {carbonFilter && (
                <Badge variant="secondary" className="ml-1">
                  {carbonFilter}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            <DropdownMenuCheckboxItem
              checked={carbonFilter === null}
              onCheckedChange={() => onCarbonFilter(null)}
            >
              All Levels
            </DropdownMenuCheckboxItem>
            {carbonLevels.map((level) => (
              <DropdownMenuCheckboxItem
                key={level.value}
                checked={carbonFilter === level.value}
                onCheckedChange={() => onCarbonFilter(level.value)}
              >
                <div className="flex items-center space-x-2">
                  <span 
                    className={`w-3 h-3 rounded-full ${
                      level.color === "success" ? "bg-success" :
                      level.color === "warning" ? "bg-warning" :
                      "bg-destructive"
                    }`}
                  />
                  <span>{level.label}</span>
                </div>
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clear Filters */}
        {(selectedCategories.length > 0 || carbonFilter) && (
          <Button
            variant="ghost"
            onClick={() => {
              onCategoryFilter([]);
              onCarbonFilter(null);
            }}
            className="text-muted-foreground"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {(selectedCategories.length > 0 || carbonFilter) && (
        <div className="flex flex-wrap gap-2">
          {selectedCategories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="flex items-center space-x-1"
            >
              <span>{category}</span>
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => handleCategoryChange(category, false)}
              />
            </Badge>
          ))}
          {carbonFilter && (
            <Badge
              variant="secondary"
              className="flex items-center space-x-1"
            >
              <span>{carbonFilter} Impact</span>
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => onCarbonFilter(null)}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};