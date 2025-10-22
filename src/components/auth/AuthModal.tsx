import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/contexts/AuthContext'
import { Loader2, Mail, Lock } from 'lucide-react'
import { toast } from 'sonner'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { signIn, signUp } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = (isSignUp: boolean) => {
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields')
      return false
    }
    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email')
      return false
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return false
    }
    if (isSignUp && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return false
    }
    return true
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm(false)) return

    setLoading(true)
    try {
      const { data, error } = await signIn(formData.email, formData.password)
      if (error) {
        toast.error(error.message || 'Sign in failed')
      } else {
        toast.success('Welcome back!')
        onClose()
        setFormData({ email: '', password: '', confirmPassword: '' })
      }
    } catch (err) {
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm(true)) return

    setLoading(true)
    try {
      const { data, error } = await signUp(formData.email, formData.password)
      if (error) {
        toast.error(error.message || 'Sign up failed')
      } else {
        toast.success('Account created! Please check your email.')
        onClose()
        setFormData({ email: '', password: '', confirmPassword: '' })
      }
    } catch (err) {
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader className="text-center pb-2">
          <DialogTitle className="text-2xl font-bold text-yellow-400">Welcome to Legal Bee</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Access AI-powered legal assistance and connect with verified lawyers
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted">
            <TabsTrigger value="signin" className="text-sm font-medium data-[state=active]:bg-yellow-500 data-[state=active]:text-gray-900">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="text-sm font-medium data-[state=active]:bg-yellow-500 data-[state=active]:text-gray-900">
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-6 mt-6">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="signin-email" className="text-sm font-medium text-foreground">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="signin-email"
                    name="email"
                    type="email"
                    placeholder="Enter your professional email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-12 pl-12 border-border bg-background placeholder:text-muted-foreground/70 focus:border-yellow-500 focus:ring-yellow-500/20"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="signin-password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="signin-password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="h-12 pl-12 border-border bg-background placeholder:text-muted-foreground/70 focus:border-yellow-500 focus:ring-yellow-500/20"
                    disabled={loading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-sm transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In to Legal Bee'
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-6 mt-6">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="signup-email" className="text-sm font-medium text-foreground">
                  Professional Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="Enter your professional email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-12 pl-12 border-border bg-background placeholder:text-muted-foreground/70 focus:border-yellow-500 focus:ring-yellow-500/20"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="signup-password" className="text-sm font-medium text-foreground">
                  Create Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="h-12 pl-12 border-border bg-background placeholder:text-muted-foreground/70 focus:border-yellow-500 focus:ring-yellow-500/20"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="confirm-password" className="text-sm font-medium text-foreground">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="h-12 pl-12 border-border bg-background placeholder:text-muted-foreground/70 focus:border-yellow-500 focus:ring-yellow-500/20"
                    disabled={loading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-sm transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Legal Bee Account'
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
