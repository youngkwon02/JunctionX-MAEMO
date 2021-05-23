export const standardTime = (d, is_am) => {
  let date = ""
  let time = ""
  d.includes('T') 
    ? [date, time] = d.split("T") 
    : [date, time] = d.split(" ")
  const [y, m, day]  = date.split("-")
  const [h, min, sec] = time.split("+")[0].split(":")
  return `${y}년 ${m}월 ${day}일 ${is_am ? "오전" : "오후"} ${h}시 ${min}분`
}

