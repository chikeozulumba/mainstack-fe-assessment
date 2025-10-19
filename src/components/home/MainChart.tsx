'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import type { ChartConfig } from '@/components/ui/chart'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { cn } from '@/lib/utils'

export const description = 'A simple area chart'

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

export function MainChartComponent({
  className,
  areaChartClassName,
}: {
  className?: string
  areaChartClassName?: string
}) {
  return (
    <ChartContainer
      className={cn('w-full h-full', className)}
      config={chartConfig}
    >
      <AreaChart
        className={cn('w-full h-full', areaChartClassName)}
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          dataKey="desktop"
          type="natural"
          fill="transparent"
          fillOpacity={0.4}
          stroke="#FF5403"
        />
      </AreaChart>
    </ChartContainer>
  )
}
