import Cookies from "js-cookie";

export function moment(input, format = "yyyy-MM-dd hh:mm:ss") {
  const date = new Date(input);
  if (String(date) === "Invalid Date") {
    return "";
  }
  const makeReg = (value) => new RegExp(`${value}`);
  const keys = ["M+", "d+", "h+", "m+", "s+", "q+", "S"];
  const values = [
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    Math.floor((date.getMonth() + 3) / 3),
    date.getMilliseconds(),
  ];
  if (/(y+)/.test(format)) {
    format = format.replace(
      /(y+)/,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let len = 0,
    key,
    val;
  while (len < keys.length) {
    key = keys[len];
    val = values[len];
    if (makeReg(key).test(format)) {
      format = format.replace(
        makeReg(key),
        RegExp.$1.length === 1 ? val : ("00" + val).substr(("" + val).length)
      );
    }
    len++;
  }
  return format;
}

export function toLogin() {
  const currentPath = window.location.path,
    loginPath = process.env.BASE_URL + "login";
  Cookies.remove("accountName");
  Cookies.remove("accountUuid");
  Cookies.remove("accountType");
  Cookies.remove("sessionid");
  Cookies.remove("searchAccount");
  if (currentPath !== loginPath) {
    Cookies.set("lastLogoutPath_CXP_WEB", location.href, { path: "/" });
    window.location.href = loginPath;
  }
}

//时长格式化
export function duration(value) {
  let t = "";
  if (value > -1) {
    let day = Math.floor(value / 86400);
    let hour = Math.floor(value / 3600) % 24;
    let min = Math.floor(value / 60) % 60;
    let sec = value % 60;

    if (day > 0) {
      t = day + "天";
    }

    if (hour > 0) {
      if (hour < 10) {
        t += "0" + hour + "小时";
      } else {
        t += hour + "小时";
      }
    }

    if (min > 0) {
      if (min < 10) {
        t += "0";
      }
      t += min + "分";
    }
    if (sec < 10) {
      t += "0";
    }
    t += sec + "秒";
  }
  return t;
}
