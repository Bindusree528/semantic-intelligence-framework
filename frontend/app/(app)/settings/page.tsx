'use client'

import { useState } from 'react'
import { Save } from 'lucide-react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    email: 'user@kmrl.metro',
    name: 'Raj Kumar',
    language: 'English',
    theme: 'auto',
    notifications: true,
    emailNotifications: true,
  })

  const handleChange = (field: string, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // TODO: Connect to backend API to save settings
    console.log('Settings saved:', settings)
  }

  return (
    <div className="max-w-2xl p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account preferences</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Account Information</h2>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
          <input
            type="text"
            value={settings.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
          <input
            type="email"
            value={settings.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Preferences</h2>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Language</label>
          <select
            value={settings.language}
            onChange={(e) => handleChange('language', e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option>English</option>
            <option>Malayalam</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Theme</label>
          <select
            value={settings.theme}
            onChange={(e) => handleChange('theme', e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="auto">Auto (System)</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Notifications</h2>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => handleChange('notifications', e.target.checked)}
            className="rounded border-border"
          />
          <div>
            <p className="font-medium text-foreground">In-app Notifications</p>
            <p className="text-sm text-muted-foreground">Receive notifications in the application</p>
          </div>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={(e) => handleChange('emailNotifications', e.target.checked)}
            className="rounded border-border"
          />
          <div>
            <p className="font-medium text-foreground">Email Notifications</p>
            <p className="text-sm text-muted-foreground">Receive email updates about important documents</p>
          </div>
        </label>
      </div>

      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition w-full md:w-auto"
      >
        <Save size={18} />
        Save Changes
      </button>
    </div>
  )
}
