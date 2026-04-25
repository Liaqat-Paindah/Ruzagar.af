import { cn } from "@/lib/utils"
import { Loader2Icon } from "lucide-react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2Icon
        role="status"
        aria-label="Loading"
        className={cn("size-12 animate-spin", className)}
        {...props}
      />
    </div>
  )
}

export { Spinner }