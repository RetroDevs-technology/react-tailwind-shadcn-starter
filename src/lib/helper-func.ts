import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'

function generateRandomString(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}
export { generateRandomString }

type UseResponsiveAnimation = (
  mobileXValues: number[],
  desktopXValues: number[],
  mobileDuration: number,
  desktopDuration: number,
) => {
  xValues: number[]
  duration: number
}

export const useResponsiveAnimation: UseResponsiveAnimation = (
  mobileXValues,
  desktopXValues,
  mobileDuration,
  desktopDuration,
) => {
  const [xValues, setXValues] = useState<number[]>(desktopXValues)
  const [duration, setDuration] = useState<number>(desktopDuration)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setXValues(mobileXValues)
        setDuration(mobileDuration)
      } else {
        setXValues(desktopXValues)
        setDuration(desktopDuration)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [mobileXValues, desktopXValues, mobileDuration, desktopDuration])

  return { xValues, duration }
}

export function startCase(str?: string): string {
  if (!str) {
    return ''
  }
  return str
    ?.replace(/([a-z])([A-Z])/g, '$1 $2') // add space between camelCase words
    .replace(/[_-]/g, ' ') // replace underscores and hyphens with spaces
    .replace(/\b\w/g, (match) => match.toUpperCase()) // capitalize first letter of each word
}

export function lowerCase(str: string): string {
  if (typeof str !== 'string') {
    console.warn('Input is not a string')
    return ''
  }
  return str.toLowerCase()
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return ''

  // Replace underscores and hyphens with spaces
  const modifiedStr = str.replace(/[_-]/g, ' ')

  // Capitalize the first letter
  const firstLetter = modifiedStr.charAt(0).toUpperCase()
  const restOfString = modifiedStr.slice(1)

  return firstLetter + restOfString
}

// snake_case, kebab-case, camelCase, PascalCase, chunk, debounce, range

export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 18) return 'Good Afternoon'
  return 'Good Evening'
}

export function formatDate(date: Date): string {
  const month = date.getMonth() + 1 // Months are zero-based
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

export function parseDate(dateString: string): Date | null {
  const [month, day, year] = dateString.split('/').map(Number)
  if (!month || !day || !year) {
    console.warn('Invalid date format')
    return null
  }
  return new Date(year, month - 1, day)
}

export function formatUsername(username?: string): string {
  if (!username) {
    return ''
  }
  return username.startsWith('@') ? username : `@${username}`
}

export function formatJoinedDate(dateString: string): string {
  try {
    const date = parseISO(dateString)
    return `Joined ${format(date, 'MMMM yyyy')}`
  } catch (error) {
    console.error('Error parsing date:', error)
    return 'Join date unavailable'
  }
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str
  }
  return `${str.slice(0, maxLength - 3)}...`
}
