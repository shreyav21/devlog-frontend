"use client"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

const POPULAR_TAGS = [
    "All","React","Next.js","Typescript","Java"
,"Spring Boot","CSS","Node,js","MongoDB","DevOps",]

type Props = {
    selected: string
    onChange:(tag:string) => void
}

export function TagFilter ({selected,onChange}:Props){
    return (
        <div className="flex flex-wrap gap-2">
            {POPULAR_TAGS.map((tag) => (
                <Button
                key={tag}
                onClick={() => onChange(tag === "All" ? "" : tag)}
                className={cn(
                    "px-4 py-1.5 rounded-full text-sm font font-medium transition-all duration-200",
                    (tag === "All" && selected === "") || selected === tag
                    ? "bg-zinc-900 text-white"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                )}
                >
                    {tag}
                </Button>
            ))}

        </div>
    )
}