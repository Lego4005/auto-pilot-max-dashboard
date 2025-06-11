'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, Zap, Activity, Settings, Plus, Download, RefreshCw, TrendingUp, Server, GitCommit, BarChart3 } from 'lucide-react'
import { TeamMemberCard } from '@/components/team-member-card'
import { AddMemberModal } from '@/components/add-member-modal'
import { UsageChart } from '@/components/usage-chart'
import { PerformanceMetrics } from '@/components/performance-metrics'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const DEPARTMENTS = [
  { code: 'engineering', name: 'Engineering', color: 'bg-blue-500' },
  { code: 'design', name: 'Design', color: 'bg-purple-500' },
  { code: 'product', name: 'Product', color: 'bg-green-500' },
  { code: 'datascience', name: 'Data Science', color: 'bg-orange-500' },
  { code: 'devops', name: 'DevOps', color: 'bg-red-500' },
  { code: 'qa', name: 'QA', color: 'bg-yellow-500' },
  { code: 'management', name: 'Management', color: 'bg-gray-500' }
]

interface TeamMember {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  api_key: string;
  access_level: string;
  usage_count: number;
  last_active: string;
  created_at: string;
}

interface Analytics {
  total_requests: number;
  active_users: number;
  average_response_time: number;
  success_rate: number;
  total_cost: number;
  period: string;
}

export default function Dashboard() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  // Sample data for development
  useEffect(() => {
    setTeamMembers([
      {
        id: '1',
        name: 'John Doe',
        email: 'john@legonow.com',
        department: 'engineering',
        role: 'developer',
        api_key: 'autopilot-engineering-developer-abc123',
        access_level: 'standard',
        usage_count: 1250,
        last_active: '2025-01-15T10:30:00Z',
        created_at: '2025-01-01T00:00:00Z'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@legonow.com',
        department: 'design',
        role: 'admin',
        api_key: 'autopilot-design-admin-def456',
        access_level: 'premium',
        usage_count: 850,
        last_active: '2025-01-15T09:15:00Z',
        created_at: '2025-01-02T00:00:00Z'
      }
    ]);

    setAnalytics({
      total_requests: 125000,
      active_users: 24,
      average_response_time: 145,
      success_rate: 99.2,
      total_cost: 245.80,
      period: '30d'
    });

    setIsLoading(false);
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Filter team members by department
  const filteredMembers = selectedDepartment
    ? teamMembers.filter((member) => member.department === selectedDepartment)
    : teamMembers;

  // Calculate MCP usage by GitHub username for correlation
  const mcpUsageByUser = teamMembers.reduce((acc: Record<string, number>, member: TeamMember) => {
    // Extract GitHub username from email or use name
    const githubUser = member.email.split('@')[0]
    acc[githubUser] = member.usage_count
    return acc
  }, {} as Record<string, number>) || {}

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                🚀 Auto-Pilot-Max Team Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Centralized team management • Real-time acceleration metrics
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button onClick={() => setIsModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.total_requests.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.active_users}</div>
              <p className="text-xs text-muted-foreground">+2 from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.average_response_time}ms</div>
              <p className="text-xs text-muted-foreground">-15ms improvement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.success_rate}%</div>
              <p className="text-xs text-muted-foreground">+0.1% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${analytics?.total_cost}</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Department Filter */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Department Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedDepartment === null ? "default" : "outline"}
                onClick={() => setSelectedDepartment(null)}
                size="sm"
              >
                All Departments ({teamMembers.length})
              </Button>
              {DEPARTMENTS.map((dept) => {
                const count = teamMembers.filter(member => member.department === dept.code).length
                
                return (
                  <Button
                    key={dept.code}
                    variant={selectedDepartment === dept.code ? "default" : "outline"}
                    onClick={() => setSelectedDepartment(dept.code)}
                    size="sm"
                    className={selectedDepartment === dept.code ? dept.color : ''}
                  >
                    {dept.name} ({count})
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <UsageChart />
          <PerformanceMetrics data={analytics} />
        </div>

        {/* Team Members */}
        <Card>
          <CardHeader>
            <CardTitle>
              Team Members 
              {selectedDepartment && (
                <span className="ml-2 text-sm font-normal text-gray-500">
                  • {DEPARTMENTS.find(d => d.code === selectedDepartment)?.name}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMembers.map((member, index) => (
                <TeamMemberCard 
                  key={member.id} 
                  member={member} 
                  onUpdate={handleRefresh}
                />
              ))}
            </div>
            
            {filteredMembers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                {selectedDepartment 
                  ? `No team members in ${DEPARTMENTS.find(d => d.code === selectedDepartment)?.name} department`
                  : 'No team members found'
                }
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Member Modal */}
      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          handleRefresh();
        }}
      />
    </div>
  )
} 