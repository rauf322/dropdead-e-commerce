'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

export function Charts({
  data: { salesData }
}: {
  data: { salesData: { month: string; totalSales: number }[] }
}) {
  return (
    <ResponsiveContainer
      width='100%'
      height={350}
    >
      <BarChart data={salesData}>
        <XAxis
          dataKey='month'
          stroke='#8888'
          fontSize={12}
          tickLine={false}
        />
        <YAxis
          stroke='#8888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={value => `$${value}`}
        />
        <Bar
          dataKey='totalSales'
          fill='blue'
          radius={8}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
