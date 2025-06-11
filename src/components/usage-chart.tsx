import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const sampleData = [
  { name: 'Jan', usage: 400 },
  { name: 'Feb', usage: 300 },
  { name: 'Mar', usage: 500 },
  { name: 'Apr', usage: 200 },
  { name: 'May', usage: 600 },
  { name: 'Jun', usage: 350 },
];

export function UsageChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="usage" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 