"use client"

import { useEffect } from "react"

interface MyNotificationOptions extends NotificationOptions {
    vibrate?: number[];
  }

export function NotificationSetup() {
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission()
    }

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(() => {
        console.log("SW registered")
      })
    }

    const interval = setInterval(async () => {
      const permission = Notification.permission
      if (permission !== "granted") return

      const res = await fetch("/api/daily/check")
      const data = await res.json()

      if (!data.doneToday && navigator.serviceWorker.controller) {
        navigator.serviceWorker.getRegistration().then((registration) => {
            registration?.getNotifications({ tag: "daily-reminder" }).then((notifications) => {
              notifications.forEach((n) => n.close())
            }).finally(() => {
              registration?.showNotification("⏰ Daily Reminder", {
                body: "Jangan lupa isi daily hari ini!",
                icon: "/192x192.png",
                vibrate: [200, 100, 200],
                tag: "daily-reminder",
              } as MyNotificationOptions)
            })
          })
      }
    }, 5 * 1000) 

    return () => clearInterval(interval)
  }, [])

  return null
}
