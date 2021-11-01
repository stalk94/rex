import React, {useEffect, useState} from 'react';
import { Add, FormClose, StatusGood, StatusWarning } from 'grommet-icons';
import { Box, Button, Grommet, Layer } from 'grommet';


export const NotificationLayer =(props)=> {
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
        EVENT.on("err", (txt)=> {
            setText(txt)
            setStatus("status-error")
            onOpen()
        })
        setTimeout(()=> EVENT.emit("payload", 'Чего пялимся?'), 2000)
        setTimeout(()=> EVENT.emit("err", '!!!Щас ошибка выпадет'), 10000)
    }, [])


    return (
        <Grommet>
            {open
                ? <Layer
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
                        {status === "status-ok"
                            ? <StatusGood/>
                            : <StatusWarning/>
                        }
                        <var>{ text }</var>
                    </Box>
                    <Button icon={<FormClose />} onClick={onClose} plain />
                 </Box>
                 </Layer>
                : ""
            }
        </Grommet>
    );
}