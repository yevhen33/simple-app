export function getTimeDiff(data) {
    const time = Date.parse(new Date()) - Date.parse(data),
          days = Math.floor(time / (1000 * 60 * 60 *24)),
          hours = Math.floor((time / (1000 * 60 * 60)) % 24),
          minutes = Math.floor((time / (1000 * 60)) % 60);
    let diff = "";

    if(days > 0) {
        diff = `${days}d. ago`;
    } else if(hours > 0) {
        diff = `${hours}h. ago`;
    } else if(minutes > 0){
        diff = `${minutes}m. ago`;
    } else {
        diff = "now";
    }

    return diff;
}