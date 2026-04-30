// নোটিফিকেশন ট্রিগার করার ফাংশন
export async function triggerNotification(data: {
  title: string;
  message: string;
  type: 'application' | 'message' | 'vacancy' | 'system';
  link?: string;
}) {
  try {
    const response = await fetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    console.error('Notification error:', error);
  }
}

// Push Notification সেটআপ
export async function requestPushPermission() {
  if (typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator) {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const registration = await navigator.serviceWorker.register('/sw.js');
      return registration;
    }
  }
  return null;
}

// Service Worker এর মাধ্যমে নোটিফিকেশন (actions সহ)
export async function sendPushNotificationWithActions(title: string, body: string, link?: string) {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const registration = await navigator.serviceWorker.ready;
      
      // Send message to service worker
      if (registration.active) {
        registration.active.postMessage({
          type: 'SHOW_NOTIFICATION',
          title: title,
          body: body,
          link: link,
          icon: '/icon-192.png',
          badge: '/badge.png'
        });
      } else {
        // Fallback without actions
        await registration.showNotification(title, {
          body: body,
          icon: '/icon-192.png',
          badge: '/badge.png',
          data: { url: link }
        });
      }
    } catch (error) {
      console.error('Push notification error:', error);
    }
  }
}

// সরল নোটিফিকেশন (সবচেয়ে সহজ)
export async function sendSimpleNotification(title: string, body: string, link?: string) {
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    const notification = new Notification(title, {
      body: body,
      icon: '/icon-192.png',
    });
    
    notification.onclick = () => {
      if (link) {
        window.focus();
        window.location.href = link;
      }
      notification.close();
    };
    
    notification.onclose = () => {
      console.log('Notification closed');
    };
    
    return notification;
  }
  return null;
}