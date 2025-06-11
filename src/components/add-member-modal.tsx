'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddMemberModal({ isOpen, onClose, onSuccess }: AddMemberModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    role: 'developer'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.department) return

    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      onSuccess()
    } catch (error) {
      console.error('Add member error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({ name: '', email: '', department: '', role: 'developer' })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Add Team Member</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input 
                type="text" 
                className="w-full mt-1 px-3 py-2 border rounded-md" 
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input 
                type="email" 
                className="w-full mt-1 px-3 py-2 border rounded-md" 
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Department</label>
              <select 
                className="w-full mt-1 px-3 py-2 border rounded-md"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                required
              >
                <option value="">Select department</option>
                <option value="engineering">Engineering</option>
                <option value="design">Design</option>
                <option value="product">Product</option>
                <option value="datascience">Data Science</option>
                <option value="devops">DevOps</option>
                <option value="qa">QA</option>
                <option value="management">Management</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Role</label>
              <select 
                className="w-full mt-1 px-3 py-2 border rounded-md"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="developer">Developer</option>
                <option value="admin">Admin</option>
                <option value="team-lead">Team Lead</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={loading || !formData.department}>
                {loading ? 'Adding...' : 'Add Member'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 