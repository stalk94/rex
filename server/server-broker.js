require("dotenv").config()
const { TaskTimer } = require("tasktimer");


process.timer = new TaskTimer((1000*60));
process.timer.start()




exports.run =()=> {
    process.timer.add([{
            id: 'task-1',
            tickInterval: 1,     
            callback(task) {
                process.SERVER_MQTT.publish(`SYS/TIME/H`, new Date().getHours().toString())
                process.SERVER_MQTT.publish(`SYS/TIME/M`, new Date().getMinutes().toString())
            }
        }
    ]);
}