export default function getQueryString(text, name) {
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = text.substr(1).match(reg);
    if(r!=null)return  decodeURI(r[2]); return null;
}