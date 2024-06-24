import { format, addMonths, subMonths, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function sumMonth(due_date: Date, prox: number) {
    const date = addMonths(due_date, prox)
    return format(date, 'yyyy-MM-dd')
}
export function sumMonthReturnIntance(due_date: string, prox: number) {
    const date = parseISO(due_date)
    const newDate = addMonths(date, prox)
    return newDate
}

export function DateReturnIntance(due_date: string) {
    const date = parseISO(due_date)
    return date
}

export function dateFormatedIso(date: Date) {
    return format(date, 'yyyy-MM-dd')
}

export function dateFormattedInFull(date: Date) {
    return format(new Date(date), 'MMMM yyyy', { locale: ptBR })
}

export function returnMonthAndYear(date: Date) {
    const formattedDate = format(date, 'MM/yyyy')
    const [m, y] = formattedDate.split('/')
    return { m, y }
}

export function prevMonth(date: Date) {
    const newDate = subMonths(date, 1)
    return newDate
}

export function nextMonth(date: Date) {
    const newDate = addMonths(date, 1)
    return newDate
}

export function formatDefaultDate(date: string) {
    const t = parseISO(date)
    const retorno = format(t, ' dd/MM/yyyy')
    return retorno
}

export function formatDefaultDateIso(date: Date) {
    return format(date, ' dd/MM/yyyy')
}

export function formatDistanceDate(date: string) {
    const iso = parseISO(date)
    return format(iso, 'd,  MMMM', { locale: ptBR })
}

export function compareDate(date1: string, date2: Date) {
    const year1 = parseISO(date1).getFullYear()
    const month1 = parseISO(date1).getMonth() + 1

    const year2 = date2.getFullYear()
    const month2 = date2.getMonth() + 1

    console.log('mes1: ' + month1 + ' mes2 ' + month2)
    console.log('ano1: ' + year1 + ' ano2 ' + year2)

    if (month1 < month2 && year1 <= year2) return true

    return false
}
