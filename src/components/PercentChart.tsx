import {Line} from "react-chartjs-2";
import {useState, useMemo} from "react";
import {Percent} from "../interfaces/percent";
import DateFormatter from "../utilities/DateFormatter";

/**
 * Takes a Percent[] and displays it in a Line Chart.
 * 
 * Practices using React Functional Components and making sure not too many re renders occur.
 * 
 * @param percents Percents array of type Percent[].
 */
const PercentChart: React.FC<{percents: Percent[]}> = ({children, percents}) => {

    //get labels and data.
    let dateLabels: string[] = [];
    let percentData: number[] = [];
    let state: string = ""; //state abbreviation.
    let color: string = "rgba(15, 150, 255, 0.4)"; //color of chart.

    try {
        percents.forEach(
            (p: Percent) => {
                dateLabels.push(DateFormatter.formatDate(p.submission_date));
                percentData.push(p.percent);
                state = p.state;
            }
        );
    } catch (error) {
        console.log("ERROR in PercentChart.tsx: "+error);
    }


    //set default chartData for chart
    const [chartData, setChartData] = useState({
        labels: ["month-day-year", "month-day-year", "month-day-year"],
        datasets: [
            {
                label: 'Past Percentages of Active Cases',
                data: percentData,
                backgroundColor: color,
            }
        ]
    });


    //only reget data for chart if state is changed. Prevents too many re-renders from occuring.
    useMemo(() => {
        //make chart with date labels and percentages ONLY if state is selected.
        if (state !== ""){
            try {
                setChartData({
                    labels: dateLabels,
                    datasets: [
                        {
                            label: 'Past Percentages of Active Cases',
                            data: percentData,
                            backgroundColor: color,
                        }
                    ]
                });
            } catch (error) {
                console.log("ERROR in PercentChart.tsx: "+error);
            }
        }
        
    }, [state, color]);
    



    return(
        <div className="chart">
            <Line
                data={chartData}
                options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                        yAxes: [{
                            ticks: {
                                suggestedMax: 1,
                                beginAtZero: true
                            }
                        }]
                    }
                }}
                height={500}
            />
        </div>
    )
}

export default PercentChart;