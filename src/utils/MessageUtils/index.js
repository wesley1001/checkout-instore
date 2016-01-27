
class MessageUtils {
    getFirstMessageText(orderForm){
      if(orderForm.messages && orderForm.messages.length > 0){
        return orderForm.messages[0].text.split('message:')[1];
      }
      else{
        return '';
      }
    }
}

export default new MessageUtils();
