
import { Line } from 'react-chartjs-2'
import { useState, useEffect} from 'react'


const Charts = ({ props, filter }) => {
    console.log(Object.entries(filter).filter((a) => a[1] === true))

    useEffect(() => {
        setchartData()

    }, [props])

    const fdata = Object.entries(filter).filter((a) => a[1] === true)


    const setchartData = () => {
        let chartdata = {}
        const labels = []
        const data = []
        if (fdata.length !== 0) {
            for (let i = 0; i < props.length; i++) {
                labels.push(props[i].date)

                data.push(props[i][fdata[0][0]])
            }

            const color = fdata[0][0] === "confirmed" ? "rgb(15,157,88)" : (fdata[0][0] === "deaths" ? "rgb(255, 0, 19)" : "rgb(66, 133, 244)")


            chartdata = {
                labels,
                datasets: [
                    {
                        label: `${fdata[0][0].toUpperCase()[0] + fdata[0][0].slice(1)} Data`,
                        data,
                        fill: true,
                        borderColor: color,
                        tension: 0.1
                    }
                ]
            }
        }
       

        console.log(chartdata)
        return chartdata


    }

    return (
        <>
            <Line data={() => setchartData()} />
            </>

    )
}

export default Charts