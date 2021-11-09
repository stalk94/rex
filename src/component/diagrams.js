import React from 'react';
import { DataChart, Chart, Grommet, Box, Menu, Text } from 'grommet';
import { FormDown } from "grommet-icons";



export const Charts =(props)=> {
    return(
        <Box margin="large" width={{ min: 'small', max: 'large' }}>
            <DataChart
                data={data}
                series={['date', 'percent']}
                chart={[
                    { 
                        property: 'percent', thickness: 'xsmall', type: 'line' 
                    },
                    {
                        property: props.property??'percent',
                        thickness: 'medium',
                        type: 'point',
                        point: 'diamond',
                    },
                ]}
                guide={{x:{granularity:'fine'}, y:{granularity:'medium'}}}
                size={{width:'fill'}}
                detail
            />
        </Box>
    );
}

export function SmallNavigations(props) {
    return(
        <Grommet>
            <Box align="center" pad="small">
            <Menu plain items={[{
                    label: <Box alignSelf="center">test</Box>,
                    onClick: ()=> {},
                },{
                    label: <Box alignSelf="center">test room</Box>,
                    onClick: ()=> {}
                }]}
            >
            <Box direction="row" gap="small" pad="large">
                <FormDown />
                
            </Box>
            </Menu>
            </Box>
        </Grommet>
    )
}