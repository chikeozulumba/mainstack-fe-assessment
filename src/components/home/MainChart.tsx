'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import type { ChartConfig } from '@/components/ui/chart'
import type { CurveType } from 'recharts/types/shape/Curve'

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

type MainChartComponentProps = {
  className?: string
  areaChartClassName?: string
  data?: Array<{
    [key: string]: number | string
  }>
  areaDataKey?: string
  dataKey?: string
  areaType?: CurveType
}
export function MainChartComponent({
  className,
  areaChartClassName,
  data = chartData,
  areaDataKey = 'desktop',
  dataKey = 'month',
  areaType = 'natural',
}: MainChartComponentProps) {
  return (
    <ChartContainer
      className={cn('w-full h-full', className)}
      config={chartConfig}
    >
      <AreaChart
        className={cn('w-full h-full', areaChartClassName)}
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={dataKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          dataKey={areaDataKey}
          type={areaType}
          fill=" #FF1744"
          fillOpacity={0.01}
          stroke="#FF5403"
        />
      </AreaChart>
    </ChartContainer>
  )
}
