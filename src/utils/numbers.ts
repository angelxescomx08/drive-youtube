export const convertToNumber = (value: unknown, defaultValue: number = -1): number =>{
  if(typeof value === "string"){
    const parsedValue = parseInt(value)
    if(isNaN(parsedValue)){
      return defaultValue
    }
    return parsedValue
  }
  if(typeof value === "number"){
    return value
  }
  return defaultValue
}