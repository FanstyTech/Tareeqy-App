export function toAbsoluteUrl(pathname) {
  return `${process.env.REACT_APP_PHOTO_BASE_URl}${pathname}`;
}

export const genderSelectList = [
  { Id: 1, Label: 'ذكر' },
  { Id: 2, Label: 'أنثى' }
];
export const employeeTypeSelectList = [
  { Id: 1, Label: 'مدير' },
  { Id: 2, Label: 'مدرب' },
  { Id: 3, Label: 'موظف مالي' }
];
