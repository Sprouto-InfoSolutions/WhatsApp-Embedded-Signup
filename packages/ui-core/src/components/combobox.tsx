"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@workspace/ui-core/lib/utils"
import { Button } from "@workspace/ui-core/components/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@workspace/ui-core/components/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui-core/components/popover"

export interface ComboboxOption {
  value: string
  label: string
  /** Compact text shown on the trigger; falls back to `label`. */
  selectedLabel?: string
  flag?: string
}

interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  className?: string
  disabled?: boolean
  /** Minimum popover width in px (useful when the trigger is narrow). */
  popoverMinWidth?: number
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyText = "No option found.",
  className,
  disabled = false,
  popoverMinWidth,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const [triggerWidth, setTriggerWidth] = React.useState<number | undefined>(undefined)

  const selectedOption = options.find((option) => option.value === value)

  const updateWidth = React.useCallback(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth)
    }
  }, [])

  React.useEffect(() => {
    updateWidth()
    if (open) {
      // Update width when dropdown opens
      const timeoutId = setTimeout(updateWidth, 0)
      return () => clearTimeout(timeoutId)
    }
  }, [open, updateWidth])

  React.useEffect(() => {
    // Handle window resize
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [updateWidth])

  const popoverWidth = React.useMemo(() => {
    if (popoverMinWidth != null) {
      return Math.max(triggerWidth ?? 0, popoverMinWidth)
    }
    return triggerWidth
  }, [popoverMinWidth, triggerWidth])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between h-auto px-3 py-3 text-sm sm:text-base",
            className
          )}
          disabled={disabled}
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border)",
            color: "var(--text-primary)",
          }}
        >
          {selectedOption ? (
            <div className="flex min-w-0 flex-1 items-center gap-2">
              {selectedOption.flag && <span className="shrink-0">{selectedOption.flag}</span>}
              <span className="truncate">
                {selectedOption.selectedLabel ?? selectedOption.label}
              </span>
            </div>
          ) : (
            <span className="truncate text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="p-0" 
        align="start"
        style={{ width: popoverWidth ? `${popoverWidth}px` : undefined }}
        onOpenAutoFocus={(e) => {
          // Prevent auto-focus on popover, let Command handle it
          e.preventDefault()
        }}
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} autoFocus />
          <CommandList
            className="max-h-64 overflow-y-auto"
            onWheel={(e) => e.stopPropagation()}
          >
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    onValueChange?.(option.value === value ? "" : option.value)
                    setOpen(false)
                  }}
                  className={cn(
                    "cursor-pointer",
                    // active (keyboard focus) - override base accent with !important
                    "data-[state=active]:bg-[rgba(0,214,143,0.15)]! data-[state=active]:text-(--text-primary)!",
                    // selected (checked) - override base accent with !important
                    "data-[selected=true]:bg-[rgba(0,214,143,0.15)]! data-[selected=true]:text-(--text-primary)!",
                    // hover state
                    "hover:bg-[rgba(0,214,143,0.1)]"
                  )}
                  // Add data attribute to help with debugging
                  data-combobox-item="true"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    {option.flag && <span className="shrink-0">{option.flag}</span>}
                    <span className="truncate">{option.label}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

