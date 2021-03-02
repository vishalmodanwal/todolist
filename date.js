// console.log(module);
module.exports.getDate=function(){
const today=new Date();
const option={
    weekday:"long",
    day:"numeric",
    month:"long"
};
return today.toLocaleDateString("en-Us",option);
};
module.exports.getDay=function(){
    const today=new Date();
    const option={
        weekday:"long"
    };
    let day=today.toLocaleDateString("en-Us",option);
    return day;
    }