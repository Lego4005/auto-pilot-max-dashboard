import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { User } from 'lucide-react';

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

interface TeamMemberCardProps {
  member: TeamMember;
  onUpdate: () => void;
}

export function TeamMemberCard({ member, onUpdate }: TeamMemberCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-lg">{member.name}</CardTitle>
            <p className="text-sm text-gray-500">{member.email}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Department</span>
            <Badge variant="secondary">{member.department}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Role</span>
            <Badge variant="outline">{member.role}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Usage</span>
            <span className="text-sm font-medium">{member.usage_count}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 