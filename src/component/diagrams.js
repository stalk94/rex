import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart,BarSeries,ArgumentAxis,ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import { EventTracker, HoverState, SelectionState } from '@devexpress/dx-react-chart';




export default class Diagram extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selection,
            data: [
                { year: '1950', population: 2.525 },
                { year: '1960', population: 3.018 },
                { year: '1970', population: 3.682 }
        ]};
    }
    render() {
        return (
            <div>
                <span>
                    Selected value:{' '}
                    {this.state.selection.length ? this.state.data[selection[0].point].population : undefined}
                </span>
                <Paper>
                    <Chart data={this.state.data}>
                        <ArgumentAxis />
                        <ValueAxis />
                        <BarSeries valueField="population" argumentField="year"/>
                        <EventTracker onClick={this.click} />
                        <HoverState />
                        <SelectionState selection={selection} />
                    </Chart>
                </Paper>
            </div>
        );
    }
}