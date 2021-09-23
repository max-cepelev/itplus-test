import React from 'react'
import { VictoryArea, VictoryAxis, VictoryChart, VictoryGroup, VictoryLegend, VictoryScatter, VictoryTheme } from 'victory'


interface Props {
	data: {houses: {x: Date, y: number}[], plants: {x: Date, y: number}[], total: {x: Date, y: number}[]} | undefined
}

export default function AreaGraph({data}: Props) {
    return (
        <div style={{width: '100%', backgroundColor: '#ffffff', borderRadius: '8px'}}>
        <VictoryChart width={1080} height={250} scale={{ x: "time" }} theme={VictoryTheme.material}>
            <VictoryLegend x={125} y={15}
                title="Общее потребление"
                centerTitle
                orientation="horizontal"
                gutter={20}
                style={{ title: {fontSize: 10 }, labels: {fontSize: 10} }}
                data={[
                { name: "Домов", symbol: { fill: "#FFB344"} },
                { name: "Заводов", symbol: { fill: "#2D46B9" } },
                { name: "Суммарное", symbol: { fill: "#FF2442" } }
                ]}
            />
            <VictoryGroup data={data?.total} style={{ data: { fill: "#FF2442", fillOpacity: 0.6 }}}>
				<VictoryArea interpolation="natural"/>
				<VictoryScatter size={2}/>
            </VictoryGroup>
            <VictoryGroup data={data?.plants} style={{ data: { fill: "#2D46B9", fillOpacity: 0.6 }}}>
				<VictoryArea interpolation="natural" />
				<VictoryScatter size={2}/>
            </VictoryGroup>
            <VictoryGroup data={data?.houses} style={{ data: { fill: "#FFB344", fillOpacity: 0.6 }}}>
				<VictoryArea interpolation="natural"/>
				<VictoryScatter size={2}/>
            </VictoryGroup>
			<VictoryAxis dependentAxis style={{ tickLabels: {fontSize: '7px', width: '350px'}}}/>
			<VictoryAxis tickCount={10} style={{axisLabel:{fontSize: '10px'}, tickLabels: {fontSize: '10px'}}}/>
        </VictoryChart>
		</div>
    )
}
