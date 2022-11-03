import { Notification } from 'element-ui';

export default {
    namespaced:true,
    actions:{
        warning(_, message){
            Notification.warning(message)
        },
        success(_, message){
            Notification.success(message)
        },
        error(_, message){
            Notification.error(message)
        }
    }
}


