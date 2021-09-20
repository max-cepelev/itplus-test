import React from 'react'
import {VictoryChart, VictoryGroup, VictoryTooltip, VictoryScatter, VictoryLabel }  from 'victory'


interface Props {
    data: any
    text: string
    color: string
    graphLabel: string
}

export default function LineGraph({data, text, color, graphLabel}: Props) {
    return (
        <section style={{backgroundColor: '#ffffff', margin: 20, padding: 10 ,borderRadius: 8}}>
            <VictoryChart height={300} width={1000}>
                <VictoryGroup
                    style={{ data: { fill: color, fillOpacity: 0.6 }}}
                    labels={({ datum }) => `${text}: ${datum.y} Потребление: ${datum.x}`}
                    labelComponent={
                    <VictoryTooltip
                        style={{ fontSize: 7 }}
                    />
                    }
                    data={data}>
                    <VictoryScatter
                        size={4}
                    />
                    <VictoryLabel text={graphLabel} x={225} y={30} textAnchor="middle"/>
                </VictoryGroup>
            </VictoryChart>
        </section>

    );
}
