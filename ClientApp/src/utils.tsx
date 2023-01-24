// Assets helpers

import { notification } from "antd";
import Translator from "i18next";
import _ from "lodash";
import nextId from "react-id-generator";
import { useTranslation } from "react-i18next";
import { instance } from "./axios_instance";

const md5 = require("md5");

export function removeCSSClass(ele: any, cls: string) {
  const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
  ele.className = ele.className.replace(reg, " ");
}

export function addCSSClass(ele: any, cls: string) {
  ele.classList.add(cls);
}

export const toAbsoluteUrl = (pathname: string) =>
  "http://localhost:8080" + pathname;

// Local storage helpers

export function removeStorage(key: string) {
  try {
    localStorage.setItem(key, "");
    localStorage.setItem(key + "_expiresIn", "");
  } catch (e) {
    console.log(
      "removeStorage: Error removing key [" +
        key +
        "] from localStorage: " +
        JSON.stringify(e)
    );
    return false;
  }
  return true;
}

export function getStorage(key: string) {
  const now = Date.now(); //epoch time, lets deal only with integer
  // set expiration for storage
  let expiresIn: number = parseInt(localStorage.getItem(key + "_expiresIn"));
  if (expiresIn === undefined || expiresIn === null) {
    expiresIn = 0;
  }

  expiresIn = Math.abs(expiresIn);
  if (expiresIn < now) {
    // Expired
    removeStorage(key);
    return null;
  } else {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.log(
        "getStorage: Error reading key [" +
          key +
          "] from localStorage: " +
          JSON.stringify(e)
      );
      return null;
    }
  }
}

export function setStorage(key: string, value: any, expires: number) {
  if (expires === undefined || expires === null) {
    expires = 24 * 60 * 60; // default: seconds for 1 day
  }

  const now = Date.now(); //millisecs since epoch time, lets deal only with integer
  const schedule: number = now + expires * 1000;
  try {
    localStorage.setItem(key, value);
    localStorage.setItem(key + "_expiresIn", schedule.toString());
  } catch (e) {
    console.log(
      "setStorage: Error setting key [" +
        key +
        "] in localStorage: " +
        JSON.stringify(e)
    );
    return false;
  }
  return true;
}

// Router helpers

const localStorageLastLocationKey = "lastLocation";

function acceptLocation(lastLocation: any) {
  return (
    lastLocation &&
    lastLocation.pathname &&
    lastLocation.pathname !== "/" &&
    lastLocation.pathname.indexOf("auth") === -1 &&
    lastLocation.pathname !== "/logout"
  );
}

export function saveLastLocation(lastLocation: any) {
  if (acceptLocation(lastLocation)) {
    setStorage(localStorageLastLocationKey, JSON.stringify(lastLocation), 120);
  }
}

export function forgotLastLocation() {
  removeStorage(localStorageLastLocationKey);
}

export function getLastLocation() {
  const defaultLocation = { pathname: "/", title: "Dashboard" };
  const localStorageLocations = getStorage(localStorageLastLocationKey);
  if (!localStorageLocations) {
    return { pathname: "/", title: "Dashboard" };
  }

  try {
    return JSON.parse(localStorageLocations);
  } catch (error) {
    console.error(error);
    return defaultLocation;
  }
}

export function getCurrentUrl(location: any) {
  return location.pathname.split(/[?#]/)[0];
}

export function checkIsActive(location: any, url: string) {
  const current = getCurrentUrl(location);
  if (!current || !url) {
    return false;
  }

  if (current === url) {
    return true;
  }

  return current.indexOf(url) > -1;
}

function getFiledConfigFromScreenFields(
  screenFields: Array<object>,
  name: string
): object {
  return screenFields && screenFields.find((obj) => obj["FIELD_NAME"] == name);
}

export const formatConstants = (constants, lang = "NA") => {
  const {
    C_BRANCHES,
    C_CARD_STATUS,
    C_GENDERS,
    C_CUS_TITLES,
    C_ACCOUNT_TYPES,
    CURRENCIES,
  } = constants;
  const formattedConstants = {
    C_BRANCHES: [],
    C_CARD_STATUS: [],
    C_GENDERS: [],
    C_CUST_TITLES: [],
    C_ACCOUNT_TYPES: [],
    CURRENCIES,
  };
  formattedConstants.C_BRANCHES = C_BRANCHES?.map((BRANCH) => {
    return { label: BRANCH[`BRANCH_NAME_${lang}`], value: BRANCH["BRANCH_ID"] };
  });

  formattedConstants.C_CARD_STATUS = C_CARD_STATUS?.map((CARD_STATUS) => {
    return {
      label: CARD_STATUS[`CARD_STATUS_${lang}`],
      value: CARD_STATUS["CARD_STATUS_ID"],
    };
  });

  formattedConstants.C_GENDERS = C_GENDERS?.map((GENDER) => {
    return { label: GENDER[`GENDER_${lang}`], value: GENDER["GENDER_ID"] };
  });

  formattedConstants.C_CUST_TITLES = C_CUS_TITLES?.map((TITLE) => {
    return { label: TITLE[`TITLE_${lang}`], value: TITLE["TITLE_ID"] };
  });

  formattedConstants.C_ACCOUNT_TYPES = C_ACCOUNT_TYPES?.map((ACCOUNT_TYPE) => {
    return {
      label: ACCOUNT_TYPE[`ACCOUNT_TYPE_${lang}`],
      value: ACCOUNT_TYPE["ACCOUNT_TYPE_ID"],
    };
  });

  formattedConstants.CURRENCIES = CURRENCIES?.map((CURRENCY) => {
    return { label: CURRENCY[`CURR_NAME_${lang}`], value: CURRENCY["CURR_ID"] };
  });
  return { ...constants, ...formattedConstants };
};

export const formatCustomers = (customers, lang = "NA") => {
  return customers?.map((customer) => {
    return { label: customer[`CUST_NAME_${lang}`], value: customer["CUST_ID"] };
  });
};

interface dataArray {
  LABEL: string;
  LABEL_ID?: number;
  FIELD_NAME?: string;
  TYPE?: number;
  REQUIRED?: number;
  MIN?: number;
  MAX?: number;
}

type type_ = "field" | "label" | "screen";

export const getLabel = (
  type: type_,
  data: Array<dataArray>,
  FIELD_NAME?: string | number
): string => {
  //type = field -- from screen field DATA screenFields.SCREEN_FIELDS
  //type = label -- from labeles DATA screenFields.LABELS
  //type = screen -- from screens DATA screenFields.SCREENS

  if (type == "field") {
    if (data && data.length > 0) {
      var _array = data;
      var _row = _array.filter((row) => row.FIELD_NAME == FIELD_NAME);
      if (_row.length > 0) {
        return _row[0]?.LABEL;
      } else {
        return "Field Not Found";
      }
    } else {
      return "Field Not Found";
    }
  }

  if (type == "label") {
    if (data && data.length > 0) {
      var _array = data;
      var _row = _array.filter((row) => row.LABEL_ID == FIELD_NAME);
      if (_row.length > 0) {
        return _row[0]?.LABEL;
      } else {
        return "Label Not Found";
      }
    } else {
      return "Label Not Found";
    }
  }

  if (type == "screen") {
    if (data && data.length > 0) {
      return data[0]?.LABEL;
    } else {
      return "screen Not Found";
    }
  }
};

export const filterCardsCustomerData = (data) => {
  let object = {};
  Object.keys(data).map((x) => {
    if (
      data[x] != [] &&
      data[x] != "" &&
      data[x] != "undefined" &&
      data[x] != "Invalid date"
    ) {
      object = { ...object, [x.toString()]: data[x] };
    }
  });
  return object;
};

export const openNotification = (
  type = "info",
  title = "",
  description = "",
  id?,
  lang = "NA"
) => {
  notification[type]({
    key: id || nextId(),
    message: title,
    description: description,
    placement: lang == "FO" ? "topRight" : "topLeft",
    duration: 4.5,
    className: `notification notification_${lang}`,
  });
};

export const md5hash = (password) => {
  const hash = md5(password);
  for (let i = 0; i < hash.Length; i++) {
    hash.append(hash[i].toString("x2"));
  }
  return hash;
};

export const getLanguage = () => {
  return Translator.language;
};

export const _doIFNotForbidden = (error, _dispatch, _callBackFunction) => {
  if (error.response.status === 401 || error.response.status === 403) {
    openNotification("error", "تم انهاء الجلسة.", "");
    _dispatch(_callBackFunction());
  }
};

export const fetchObjectFromObjectPK = (array, pk, value) => {
  return array.find((element) => element[`${pk}`] === value);
};

export const _filter = (object, value) => {
  let condition = false;
  for (const [key] of Object.entries(object)) {
    if (typeof object[key] === "string")
      condition = condition || object[key].includes(value);
    if (typeof object[key] === "number")
      condition = condition || object[key] === value;
  }
  return condition;
};

export const mergeObjects = (arr) => {
  let returnedObject = {};
  for (const ele in arr) {
    returnedObject = Object.assign(ele, returnedObject);
  }
  return returnedObject;
};

export class UniqueArray extends Array {
  constructor(array) {
    super();
    array.forEach((a) => {
      if (!this.find((v) => _.isEqual(v, a))) this.push(a);
    });
  }
}

export const getLabelName = (labels: Array<any>, id: number) => {
  const _label = labels.filter((label) => label.LABEL_ID == id);
  if (_label.length === 0) return "";
  return _label[0]["LABEL"];
};

export const checkIfAllBoolean = (data: Array<any>) => {
  let ifAllBoolean = true;
  data.map((item) => {
    ifAllBoolean = ifAllBoolean && typeof item == "boolean";
  });
  return ifAllBoolean;
};

export const downloadFileObj = (fileName, file) => {
  const url = window.URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
};

export const withRespectToUnselect = (options = []) => {
  return [{ value: "", label: "" }, ...options];
};
export const withRespectToUnselect2 = (options = []) => {
  return [{ value: "3", label: "جدول" }, ...options];
};

export const acceptJustNumbers = (value) => {
  if (value) {
    return !isNaN(value[value.length - 1])
      ? value
      : value.substring(0, value.length - 1);
  }
  return value;
};

export const acceptJustPositiveNumbers = (event) => {
  if (event.shiftKey) {
    event.preventDefault();
  }

  if (event.keyCode == 46 || event.keyCode == 8) {
  } else {
    if (event.keyCode < 95) {
      if (event.keyCode < 48 || event.keyCode > 57) {
        event.preventDefault();
      }
    } else {
      if (event.keyCode < 96 || event.keyCode > 105) {
        event.preventDefault();
      }
    }
  }
};

export const validateNumberTextFieldMaxValueRule =
  (config) =>
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (value.toString().length > config.max) {
        return Promise.reject(
          new Error(
            `${config.label}: ` +
              `يجب عليك إدخال ${config.max} رقم بالحد الأكثر.`
          )
        );
      }
      return Promise.resolve();
    },
  });

export const customBackendMessage = (id) => {
  new Promise((resolve, reject) =>
    instance
      .get("/api/Data/GetMessage", {
        params: {
          MESSAGE_ID: id,
        },
      })
      .then((res) => {
        resolve(res.data.Message);
      })
      .catch((e) => {
        reject("_");
      })
  );
};

export const onFilterOption = (value, option, optionsArray) => {
  const keys = Object.keys(optionsArray[0]);
  const ele = optionsArray.find((_) => _[keys[0]] == option.value);
  if (!ele) return;
  return ele[keys[1]].includes(value);
};
//return something negative if first argument is less than second
//something positive if first argument is greater
//0 if those two elements are equal.

export const alphabeticallSort = (a, b, name: string) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};
export function checkCARDNumber(evt) {
  let ASCIICode = evt.charCodeAt(0); // 97
  while (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
    evt = evt.substring(1, evt.length);
    ASCIICode = evt.charCodeAt(0);
  }
  ASCIICode = evt.charCodeAt(evt.length - 1); // 97
  while (
    ASCIICode > 31 &&
    (ASCIICode < 48 || ASCIICode > 57) &&
    ASCIICode != 46
  ) {
    evt = evt.substring(0, evt.length - 1);
    ASCIICode = evt.charCodeAt(evt.length - 1);
  }
  return evt;
}

export interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
  isShowInHead: boolean;
}
