import React, {useEffect, useState} from 'react';
import { FormClose, StatusGood, StatusWarning, StatusCritical } from 'grommet-icons';
import { Box, Button, Grommet, Layer } from 'grommet';
import Switch, { Case, Default } from 'react-switch-case';




export default function NotificationLayer(props) {
    const [open, setOpen] = useState()
    const [text, setText] = useState("")
    const [status, setStatus] = useState("status-ok")
    
    const onOpen =()=> {
        setOpen(true)
        setTimeout(()=> setOpen(undefined), 4000);
    }
    const onClose =()=> setOpen(undefined);

    useEffect(()=> {
        EVENT.on("payload", (txt)=> {
            setText(txt)
            setStatus("status-ok")
            onOpen()
        })
        EVENT.on("error", (txt)=> {
            setText(txt)
            setStatus("status-error")
            onOpen()
        })
        EVENT.on("warn", (txt)=> {
            setText(txt)
            setStatus("status-warning")
            onOpen()
        })
        EVENT.emit("payload", `рады снова тебя видеть`)
    }, [])


    return(
        <Grommet>
            {open &&
                <Layer
                    position="bottom"
                    modal={false}
                    margin={{vertical:'medium',horizontal:'small'}}
                    onEsc={onClose}
                    responsive={false}
                    plain={true}
                >
                <Box
                    align="center"
                    direction="row"
                    gap="small"
                    justify="between"
                    round="medium"
                    elevation="medium"
                    pad={{vertical:'xsmall', horizontal:'medium'}}
                    background={status}
                >
                    <Box align="center" direction="row" gap="xsmall">
                        <Switch condition={status}>
                            <Case value="status-ok">
                                <StatusGood/>
                            </Case>
                            <Case value="status-warning">
                                <StatusWarning/>
                            </Case>
                            <Default>
                                <StatusCritical/>
                            </Default>
                        </Switch>

                        <var>{ text }</var>
                    </Box>
                    <Button icon={<FormClose/>} onClick={onClose} plain />
                </Box>
                </Layer>
            }
        </Grommet>
    );
}