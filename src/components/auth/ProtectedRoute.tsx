import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { AuthModal } from './AuthModal'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth()
  const [authModalOpen, setAuthModalOpen] = React.useState(false)

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <>
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center bg-card rounded-lg shadow-lg p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-yellow-400 mb-4">Welcome to Legal Bee</h1>
              <p className="text-muted-foreground mb-6">
                Your AI-powered legal assistant in Bangladesh. Get instant answers to your legal questions,
                connect with verified lawyers, and access personalized legal guidance.
              </p>
              <div className="grid gap-4 text-left text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    🎯
                  </div>
                  <span>Instant legal answers AI-powered by advanced algorithms</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    👥
                  </div>
                  <span>Connect with verified Bangladeshi lawyers</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    💬
                  </div>
                  <span>Save conversations and get personalized assistance</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    🔒
                  </div>
                  <span>Secure platform with professional legal standards</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setAuthModalOpen(true)}
              className="w-full bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Join Legal Bee - Sign Up
            </button>

            <p className="text-xs text-muted-foreground mt-4">
              Registration is required to access all features and ensure personalized legal assistance.
            </p>
          </div>
        </div>

        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />
      </>
    )
  }

  return <>{children}</>
}
