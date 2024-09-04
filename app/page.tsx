'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import Link from 'next/link'
import { Settings } from 'lucide-react'

export default function Home() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-4">
        <h1 className="scroll-m-20 font-extrabold tracking-tight lg:text-5xl">
          CharTyper
        </h1>
        <div className="flex gap-2">
          <Link className="w-full" href={'/play'}>
            <Button className="w-full">Play</Button>
          </Link>
          <Button
            onClick={() => setOpen(!open)}
            variant={'secondary'}
            size={'icon'}
            className="w-full"
          >
            <Settings size={20} />
          </Button>
        </div>
      </section>
      <div className="relative">
        {open && (
          <section className=" flex flex-col gap-4 items-center absolute">
            <Select>
              <SelectTrigger className="w-[239.8px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </section>
        )}
      </div>
    </div>
  )
}
