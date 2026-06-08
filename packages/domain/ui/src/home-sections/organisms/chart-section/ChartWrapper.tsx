import { useMemo } from 'react'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
  SkeletonSquare,
  RechartsPrimitive,
  SkeletonText,
} from '@spacedock/falcon-ui'

import type { ChartData } from './types'

export interface ChartWrapperProps {
  data: ChartData[]
  isLoading?: boolean
  title?: string
  subtitle?: string
  chartType?: 'bar' | 'bar-stacked' | 'line' | 'area' | 'pie'
  chartDirection?: 'vertical' | 'horizontal'
  lineDot?: boolean
  lineType?: RechartsPrimitive.LineProps['type']
  showLegend?: boolean
  showTooltip?: boolean
  showGrid?: boolean
  xAxisKey?: string
  yAxisKeys?: string[]
  colors?: Record<string, string>
  height?: number
  className?: string
  titleRight?: React.ReactNode
}

const DEFAULT_COLORS = {
  coursesCompleted: 'var(--success)', // Red for completed
  completed: 'var(--success)', // Red for completed
  inProgress: 'var(--muted)', // Gray for in progress
  stepsCompleted: '16, 78, 100', // Red for completed
}

export const ChartWrapper = ({
  data,
  isLoading = false,
  title,
  subtitle,
  chartType = 'bar',
  chartDirection = 'horizontal',
  lineDot = false,
  lineType = 'natural',
  showLegend = true,
  showTooltip = true,
  showGrid = true,
  xAxisKey = 'name',
  yAxisKeys = ['completed', 'inProgress'],
  colors = DEFAULT_COLORS,
  height,
  className,
  titleRight,
}: ChartWrapperProps) => {
  const chartConfig = useMemo((): ChartConfig => {
    const config: ChartConfig = {}

    yAxisKeys.forEach((key) => {
      config[key] = {
        label:
          key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
        color:
          colors[key] ||
          DEFAULT_COLORS[key as keyof typeof DEFAULT_COLORS] ||
          'var(--muted)',
      }
    })

    return config
  }, [yAxisKeys, colors])

  if (isLoading) {
    return (
      <div className={className}>
        {/* Header */}
        {(title || subtitle) && (
          <div className="mb-4 flex flex-row justify-between px-4">
            <div>
              {title && (
                <h3 className="text-site-fg text-lg font-medium">
                  <SkeletonText size="lg" length="medium" />
                </h3>
              )}
              {subtitle && (
                <p className="text-site-fg mt-1 text-sm opacity-70">
                  <SkeletonText size="sm" length="medium" />
                </p>
              )}
            </div>

            {titleRight && (
              <div>
                <SkeletonText size="sm" length="medium" />
              </div>
            )}
          </div>
        )}

        {/* Chart */}
        <div style={height ? { height } : undefined}>
          <SkeletonSquare className="aspect-video h-full" size="full" />
        </div>
      </div>
    )
  }

  const containerStyle = height ? { height } : undefined

  return (
    <div className={className}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-4 flex flex-row justify-between px-4">
          <div>
            {title && (
              <h3 className="text-site-fg text-lg font-medium">{title}</h3>
            )}
            {subtitle && (
              <p className="text-site-fg mt-1 text-sm opacity-70">{subtitle}</p>
            )}
          </div>

          {titleRight && <div>{titleRight}</div>}
        </div>
      )}

      {/* Chart */}
      <div style={containerStyle}>
        {data.length === 0 ? (
          <div className="text-site-fg flex min-h-[250px] items-center justify-center">
            No data available
          </div>
        ) : (
          <ChartRouter
            chartConfig={chartConfig}
            chartType={chartType}
            chartDirection={chartDirection}
            data={data}
            lineDot={lineDot}
            lineType={lineType}
            showGrid={showGrid}
            xAxisKey={xAxisKey}
            yAxisKeys={yAxisKeys}
            showTooltip={showTooltip}
            showLegend={showLegend}
          />
        )}
      </div>
    </div>
  )
}

interface ChartRouterProps extends ChartWrapperProps {
  chartConfig: ChartConfig
  yAxisKeys: string[]
}

const ChartRouter = ({
  chartConfig,
  chartType,
  chartDirection,
  data,
  lineDot,
  lineType,
  showGrid,
  xAxisKey,
  yAxisKeys,
  showTooltip,
  showLegend,
}: ChartRouterProps) => {
  switch (chartType) {
    case 'line':
      return (
        <ChartContainer config={chartConfig} className="size-full">
          <RechartsPrimitive.LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            layout={chartDirection === 'vertical' ? chartDirection : undefined}
          >
            {showGrid && (
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
            )}
            <RechartsPrimitive.XAxis
              dataKey={xAxisKey}
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <RechartsPrimitive.YAxis tick={{ fontSize: 12 }} />
            {showTooltip && <ChartTooltip content={<ChartTooltipContent />} />}
            {showLegend && <ChartLegend content={<ChartLegendContent />} />}
            {yAxisKeys.map((key, curIdx) => (
              <RechartsPrimitive.Line
                key={key}
                dataKey={key}
                stroke={getBarColor(key, curIdx, chartConfig)}
                type={lineType}
                dot={lineDot}
                // radius={[2, 2, 0, 0]}
                // stackId={chartType === 'bar-stacked' ? 'a' : undefined}
              />
            ))}
          </RechartsPrimitive.LineChart>
        </ChartContainer>
      )
    case 'area':
      return (
        <ChartContainer config={chartConfig} className="size-full">
          <RechartsPrimitive.AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            layout={chartDirection === 'vertical' ? chartDirection : undefined}
          >
            {showGrid && (
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
            )}
            <RechartsPrimitive.XAxis
              dataKey={xAxisKey}
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <RechartsPrimitive.YAxis tick={{ fontSize: 12 }} />
            {showTooltip && <ChartTooltip content={<ChartTooltipContent />} />}
            {showLegend && <ChartLegend content={<ChartLegendContent />} />}
            {yAxisKeys.map((key, curIdx) => (
              <RechartsPrimitive.Area
                key={key}
                dataKey={key}
                stroke={getBarColor(key, curIdx, chartConfig)}
                fill={getBarColor(key, curIdx, chartConfig)}
                type={lineType}
                dot={lineDot}
                // radius={[2, 2, 0, 0]}
                // stackId={chartType === 'bar-stacked' ? 'a' : undefined}
              />
            ))}
          </RechartsPrimitive.AreaChart>
        </ChartContainer>
      )
    case 'pie':
    case 'bar':
    case 'bar-stacked':
    default:
      return (
        <ChartContainer config={chartConfig} className="size-full">
          <RechartsPrimitive.BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            layout={chartDirection === 'vertical' ? chartDirection : undefined}
          >
            {showGrid && (
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
            )}
            <RechartsPrimitive.XAxis
              dataKey={xAxisKey}
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <RechartsPrimitive.YAxis tick={{ fontSize: 12 }} />
            {showTooltip && <ChartTooltip content={<ChartTooltipContent />} />}
            {showLegend && <ChartLegend content={<ChartLegendContent />} />}
            {yAxisKeys.map((key, curIdx) => (
              <RechartsPrimitive.Bar
                key={key}
                dataKey={key}
                fill={getBarColor(key, curIdx, chartConfig)}
                radius={getScalingRadius(
                  curIdx,
                  yAxisKeys.length,
                  data.length,
                  chartDirection ?? 'horizontal',
                  chartType ?? 'bar',
                )}
                stackId={chartType === 'bar-stacked' ? 'a' : undefined}
              />
            ))}
          </RechartsPrimitive.BarChart>
        </ChartContainer>
      )
  }
}

function getScalingRadius(
  graphIndex: number,
  graphsCount: number,
  itemsCount: number,
  direction: 'vertical' | 'horizontal',
  chartType: 'bar' | 'bar-stacked' | 'line' | 'area' | 'pie',
): [number, number, number, number] {
  let radius = 2

  if (itemsCount > 15) {
    radius = 4
  } else if (itemsCount > 10) {
    radius = 7
  } else if (itemsCount > 5) {
    radius = 9
  } else if (itemsCount > 3) {
    radius = 10
  }

  if (chartType !== 'bar') {
    if (!graphIndex) {
      return [0, 0, radius, radius]
    } else if (graphIndex + 1 < graphsCount) {
      return [0, 0, 0, 0]
    }
  }

  return direction === 'horizontal'
    ? [radius, radius, 0, 0]
    : [0, radius, radius, 0]
}

function getBarColor(key: string, curIdx: number, chartConfig: ChartConfig) {
  if (chartConfig[key]?.color) {
    return chartConfig[key].color
  }

  if (/(\-match)$/.test(key)) {
    return `var(--color-${curIdx})`
  } else if (DEFAULT_COLORS[key as keyof typeof DEFAULT_COLORS]) {
    return `rgb(${DEFAULT_COLORS[key as keyof typeof DEFAULT_COLORS]})`
  }

  return `var(--chart-${curIdx + 1})`
}
