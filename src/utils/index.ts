export const shuffleArr = (array: any) => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

const getWeek = (dateTime: any) => {
  let temptTime = new Date(dateTime.getTime());
  let weekday = temptTime.getDay() || 7;
  temptTime.setDate(temptTime.getDate() - weekday + 1 + 5);
  let firstDay = new Date(temptTime.getFullYear(), 0, 1);
  let dayOfWeek = firstDay.getDay();
  let spendDay = 1;
  if (dayOfWeek != 0) spendDay = 7 - dayOfWeek + 1;
  firstDay = new Date(temptTime.getFullYear(), 0, 1 + spendDay);
  let d = Math.ceil((temptTime.valueOf() - firstDay.valueOf()) / 86400000);
  let result = Math.ceil(d / 7);
  return result;
};

export const formatDate = (date: any, format: string) => {
  let we = date.getDay();
  let z = getWeek(date);
  let qut = Math.floor((date.getMonth() + 3) / 3).toString();
  const opt:any = {
    "Y+": date.getFullYear().toString(),
    "m+": (date.getMonth() + 1).toString(),
    "d+": date.getDate().toString(),
    "H+": date.getHours().toString(),
    "M+": date.getMinutes().toString(),
    "S+": date.getSeconds().toString(),
    "q+": qut,
  };
  const week:any = {
    0: "Sun",
    1: "Mon",
    2: "Tues",
    3: "Wed",
    4: "Thur",
    5: "Fri",
    6: "Sat",
  };
  const quarter:any = {
    1: "First",
    2: "Second",
    3: "Third",
    4: "Fourth",
  };
  if (/(W+)/.test(format))
    format = format.replace(
      RegExp.$1,
      RegExp.$1.length > 1
        ? RegExp.$1.length > 2
          ? week[we]
          : week[we]
        : week[we]
    );
  if (/(Q+)/.test(format))
    format = format.replace(
      RegExp.$1,
      RegExp.$1.length == 4 ? quarter[qut] + "quarter" : quarter[qut]
    );
  if (/(Z+)/.test(format))
    format = format.replace(
      RegExp.$1,
      RegExp.$1.length == 3 ? "Week " + z : z + ""
    );
  for (let k in opt) {
    let r = new RegExp("(" + k + ")").exec(format);
    if (r)
      format = format.replace(
        r[1],
        RegExp.$1.length == 1 ? opt[k] : opt[k].padStart(RegExp.$1.length, "0")
      );
  }
  return format;
};
