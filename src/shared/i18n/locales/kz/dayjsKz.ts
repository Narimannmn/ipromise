import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const kazakhLocale = {
  name: "kz", // Locale name
  weekdays: "Жексенбі_Дүйсенбі_Сейсенбі_Сәрсенбі_Бейсенбі_Жұма_Сенбі".split(
    "_",
  ),
  months:
    "Қаңтар_Ақпан_Наурыз_Сәуір_Мамыр_Маусым_Шілде_Тамыз_Қыркүйек_Қазан_Қараша_Желтоқсан".split(
      "_",
    ),
  weekStart: 1,
  weekdaysShort: "Жек_Дүй_Сей_Сәр_Бей_Жұм_Сен".split("_"),
  monthsShort: "Қаң_Ақп_Нау_Сәу_Мам_Мау_Шіл_Там_Қыр_Қаз_Қар_Жел".split("_"),
  formats: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd, D MMMM YYYY HH:mm",
  },
  relativeTime: {
    future: "%s ішінде", // In future
    past: "%s бұрын", // In past
    s: "бірнеше секунд", // A few seconds
    m: "бір минут", // A minute
    mm: "%d минут", // X minutes
    h: "бір сағат", // An hour
    hh: "%d сағат", // X hours
    d: "бір күн", // A day
    dd: "%d күн", // X days
    M: "бір ай", // A month
    MM: "%d ай", // X months
    y: "бір жыл", // A year
    yy: "%d жыл", // X years
  },
  ordinal: (n: number) => `${n}-ші`,
};
