import React from 'react'
import {VictoryChart, VictoryVoronoiContainer, VictoryGroup, VictoryTooltip, VictoryLine, VictoryScatter, VictoryLabel }  from 'victory'


interface Props {
    data: any
    text: string
    color: string
    grapfLabel: string
}

export default function LineGraph({data, text, color, grapfLabel}: Props) {
    return (
        <VictoryChart height={300} width={1000}
            containerComponent={<VictoryVoronoiContainer/>}>
            <VictoryGroup
                color={color}
                labels={({ datum }) => `${text}: ${datum.y} Потребление: ${datum.x}`}
                labelComponent={
                <VictoryTooltip
                    style={{ fontSize: 10 }}
                />
                }
                data={data}>
                <VictoryScatter
                    size={({ active }) => active ? 8 : 3}
                />
                <VictoryLabel text={grapfLabel} x={225} y={30} textAnchor="middle"/>
            </VictoryGroup>
        </VictoryChart>
    );
}
