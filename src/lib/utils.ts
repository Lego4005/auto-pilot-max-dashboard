import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat('en-US').format(num)
}

export function generateApiKey(department: string, role: string) {
  const randomId = Math.random().toString(36).substring(2, 15)
  return `autopilot-${department}-${role}-${randomId}`
}

export function getDepartmentColor(department: string) {
  const colors: Record<string, string> = {
    engineering: 'blue',
    design: 'purple',
    product: 'green',
    datascience: 'orange',
    devops: 'red',
    qa: 'yellow',
    management: 'gray',
  }
  return colors[department] || 'gray'
}

export function getAccessLevelBadge(level: string) {
  const badges: Record<string, { label: string; color: string }> = {
    admin: { label: 'Admin', color: 'red' },
    developer: { label: 'Developer', color: 'blue' },
    'team-lead': { label: 'Team Lead', color: 'purple' },
    viewer: { label: 'Viewer', color: 'gray' },
  }
  return badges[level] || { label: level, color: 'gray' }
} 