import React from 'react'
import { VictoryLabel, VictoryPie } from 'victory'

interface Props {
    data: {
        x: string
        y: number
    }[]
}

export default function PieGraph({data}: Props) {
    return (
    <svg viewBox="0 0 250 250">

        <VictoryPie
            standalone={false}
            width={200} height={200}
            data={data}
            style={{ labels: { fontSize: 4, fill: "black" } }}
            colorScale={["tomato", "navy" ]}
            labels={({ datum }) => `${datum.x}: ${datum.y}`}
        />
        <VictoryLabel
            textAnchor="middle"
            style={{ fontSize: 5 }}
            x={130} y={20}
            text="Доли общего потребления домов и заводов"
        />
    </svg>
    )
}
