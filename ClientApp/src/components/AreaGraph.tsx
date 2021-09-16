import React from 'react'
import { VictoryArea, VictoryChart, VictoryGroup, VictoryPortal, VictoryScatter, VictoryStack } from 'victory'


interface Props {
  data: {houses: {x: Date, y: number}[], plants: {x: Date, y: number}[], total: {x: Date, y: number}[]} | undefined
}

export default function AreaGraph({data}: Props) {
    return (
        <div style={{width: '100%', backgroundColor: '#ffffff', borderRadius: '8px'}}>
        <VictoryChart scale={{ x: "time" }} width={1080} height={250} >
          {/* <VictoryStack colorScale="warm">
            <VictoryGroup
              data={data?.total}
            >
              <VictoryArea/>
              <VictoryPortal>
                <VictoryScatter
                  style={{ data: { fill: "black" } }}
                  size={1}
                />
              </VictoryPortal>
            </VictoryGroup>
            <VictoryGroup
              data={data?.plants}
            >
              <VictoryArea/>
            <VictoryPortal>
                <VictoryScatter
                  style={{ data: { fill: "black" } }}
                  size={1}
                />
              </VictoryPortal>
            </VictoryGroup>
            <VictoryGroup
              data={data?.total}
            >
              <VictoryArea/>
              <VictoryPortal>
                <VictoryScatter
                  style={{ data: { fill: "black" } }}
                  size={1}
                />
              </VictoryPortal>
            </VictoryGroup>
          </VictoryStack> */}
            <VictoryArea data={data?.total} interpolation="natural"  style={{ data: { fill: "#bd137c", fillOpacity: 0.6 } }} />
            <VictoryArea data={data?.plants} interpolation="natural" style={{ data: { fill: "#3d6ba8", fillOpacity: 0.6 } }} />
            <VictoryArea data={data?.houses} interpolation="natural" style={{ data: { fill: "#c43a31", fillOpacity: 0.6 } }} />
        </VictoryChart>
      </div>
    )
}
