import { fetchFREDSeries, type FREDSeries } from '@/api/fred-api';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';

interface WidgetSeriesProps {
  value?: FREDSeries;
  onValueChange?(value: FREDSeries): void;
}

const WidgetSeries: React.FC<WidgetSeriesProps> = ({
  value,
  onValueChange,
}) => {
  const [searchQuery, setWidgetQuery] = useState('');
  const [debouncedWidgetQuery] = useDebounce(searchQuery, 500);
  const [open, setOpen] = useState(false);
  const enabled = !!debouncedWidgetQuery && debouncedWidgetQuery.length > 2;
  const {
    data,
    isLoading: isLoadingOrig,
    isError,
  } = useQuery<FREDSeries[]>({
    queryKey: ['fredSeries', debouncedWidgetQuery],
    queryFn: () => fetchFREDSeries(debouncedWidgetQuery),
    enabled,
  });

  const isLoading = enabled && isLoadingOrig;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a Dashboard"
          className="w-full md:w-[650px] justify-between truncate ..."
        >
          {value?.title || 'Select a series'}
          <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[400px] md:w-[650px] p-0">
        <Command className="h-auto rounded-lg border border-b-0 shadow-md">
          <CommandInput
            className="p-0"
            value={searchQuery}
            onValueChange={setWidgetQuery}
            placeholder="Search FRED series (e.g. GDP)"
          />

          <CommandList>
            {isLoading && <div className="p-4 text-sm">Searching...</div>}

            {!isError && !isLoading && !data?.length && (
              <div className="p-4 text-sm">No series found</div>
            )}
            {isError && <div className="p-4 text-sm">Something went wrong</div>}

            {data?.map(({ id, title }) => {
              return (
                <CommandItem
                  key={id}
                  onSelect={() => {
                    onValueChange?.({ id, title });
                    setOpen(false);
                  }}
                  value={id + title}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value?.id === id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {title}
                </CommandItem>
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default WidgetSeries;
