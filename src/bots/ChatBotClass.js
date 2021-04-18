module.exports = class ChatBot{
    constructor ({name, description, avatar, status}){
        this.name = name;
        this.description = description;
        this.avatar = avatar;
        this.status = status;
        this.onMessage = this.onMessage.bind(this);
    }
    onMessage(){}
}