'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { GitCommit, GitPullRequest, FileText, TrendingUp, Users, Calendar, GitBranch, Star } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { format } from 'date-fns';

interface GitHubStats {
  repository: {
    name: string;
    description: string;
    language: string;
    size: number;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    updated_at: string;
  };
  team_activity: Record<string, {
    commits: number;
    files_changed: number;
    additions: number;
    deletions: number;
    last_commit: string;
  }>;
  recent_commits: Array<{
    sha: string;
    message: string;
    author: string;
    date: string;
    files_changed: number;
    additions: number;
    deletions: number;
    files: Array<{
      filename: string;
      status: string;
      changes: number;
    }>;
  }>;
  velocity_metrics: {
    commits_per_day: number;
    active_contributors: number;
    total_files_changed: number;
    total_lines_changed: number;
    pull_requests_count: number;
    open_prs: number;
  };
  pull_requests: Array<{
    number: number;
    title: string;
    state: string;
    created_at: string;
    author: string;
    additions: number;
    deletions: number;
    changed_files: number;
  }>;
  generated_at: string;
}

interface GitHubActivityProps {
  mcpUsage?: Record<string, number>; // To correlate with MCP usage
}

export function GitHubActivity({ mcpUsage }: GitHubActivityProps) {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGitHubStats();
    // Refresh every 5 minutes
    const interval = setInterval(fetchGitHubStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchGitHubStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/github/stats');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch GitHub stats');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch GitHub stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCommit className="h-5 w-5" />
            GitHub Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <GitCommit className="h-5 w-5" />
            GitHub Activity - Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-600 text-sm">
            {error}
            <br />
            <span className="text-gray-500 text-xs">
              Make sure GITHUB_TOKEN is configured in environment variables
            </span>
          </div>
          <button 
            onClick={fetchGitHubStats}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </CardContent>
      </Card>
    );
  }

  if (!stats) return null;

  // Calculate MCP vs GitHub correlation
  const correlationData = Object.entries(stats.team_activity).map(([author, activity]) => ({
    author,
    commits: activity.commits,
    files_changed: activity.files_changed,
    mcp_usage: mcpUsage?.[author] || 0,
    acceleration_factor: mcpUsage?.[author] ? 
      (activity.commits + activity.files_changed) / mcpUsage[author] : 0,
  }));

  // Prepare chart data for commit timeline
  const commitTimeline = stats.recent_commits
    .slice(0, 14)
    .map(commit => ({
      date: format(new Date(commit.date), 'MMM dd'),
      commits: 1,
      files: commit.files_changed,
      lines: commit.additions + commit.deletions,
    }))
    .reduce((acc: any[], curr) => {
      const existing = acc.find(item => item.date === curr.date);
      if (existing) {
        existing.commits += curr.commits;
        existing.files += curr.files;
        existing.lines += curr.lines;
      } else {
        acc.push(curr);
      }
      return acc;
    }, [])
    .reverse();

  return (
    <div className="space-y-6">
      {/* Repository Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Repository: {stats.repository.name}
          </CardTitle>
          <CardDescription>{stats.repository.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">
                <strong>{stats.repository.stargazers_count}</strong> stars
              </span>
            </div>
            <div className="flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-blue-500" />
              <span className="text-sm">
                <strong>{stats.repository.forks_count}</strong> forks
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-green-500" />
              <span className="text-sm">
                <strong>{Math.round(stats.repository.size / 1024)}</strong> MB
              </span>
            </div>
            <div className="flex items-center gap-2">
              <GitPullRequest className="h-4 w-4 text-purple-500" />
              <span className="text-sm">
                <strong>{stats.repository.open_issues_count}</strong> open issues
              </span>
            </div>
          </div>
          <div className="mt-4">
            <Badge variant="secondary">{stats.repository.language}</Badge>
            <span className="text-xs text-gray-500 ml-2">
              Last updated: {format(new Date(stats.repository.updated_at), 'MMM dd, yyyy')}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Velocity Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <GitCommit className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Commits/Day</p>
                <p className="text-lg font-bold">{stats.velocity_metrics.commits_per_day.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Contributors</p>
                <p className="text-lg font-bold">{stats.velocity_metrics.active_contributors}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Files Changed</p>
                <p className="text-lg font-bold">{stats.velocity_metrics.total_files_changed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Lines Changed</p>
                <p className="text-lg font-bold">{stats.velocity_metrics.total_lines_changed.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <GitPullRequest className="h-4 w-4 text-indigo-500" />
              <div>
                <p className="text-sm text-gray-600">Total PRs</p>
                <p className="text-lg font-bold">{stats.velocity_metrics.pull_requests_count}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <GitPullRequest className="h-4 w-4 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">Open PRs</p>
                <p className="text-lg font-bold">{stats.velocity_metrics.open_prs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="activity" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="activity">Team Activity</TabsTrigger>
          <TabsTrigger value="timeline">Commit Timeline</TabsTrigger>
          <TabsTrigger value="correlation">MCP Correlation</TabsTrigger>
          <TabsTrigger value="commits">Recent Commits</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Member Activity</CardTitle>
              <CardDescription>Commits, files changed, and code contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(stats.team_activity).map(([author, activity]) => (
                  <div key={author} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-800">
                          {author.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{author}</p>
                        <p className="text-sm text-gray-500">
                          Last commit: {format(new Date(activity.last_commit), 'MMM dd, HH:mm')}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-blue-600">{activity.commits}</p>
                        <p className="text-xs text-gray-500">Commits</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-green-600">{activity.files_changed}</p>
                        <p className="text-xs text-gray-500">Files</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-green-500">+{activity.additions}</p>
                        <p className="text-xs text-gray-500">Added</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-red-500">-{activity.deletions}</p>
                        <p className="text-xs text-gray-500">Deleted</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Development Timeline</CardTitle>
              <CardDescription>Daily commits, files changed, and lines of code</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={commitTimeline}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="commits" stroke="#3b82f6" strokeWidth={2} />
                    <Line yAxisId="left" type="monotone" dataKey="files" stroke="#10b981" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="lines" stroke="#f59e0b" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="correlation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>MCP Usage vs GitHub Activity</CardTitle>
              <CardDescription>Correlation between MCP acceleration and development output</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={correlationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="author" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="commits" fill="#3b82f6" />
                    <Bar yAxisId="left" dataKey="files_changed" fill="#10b981" />
                    <Bar yAxisId="right" dataKey="mcp_usage" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Commits</CardTitle>
              <CardDescription>Latest code changes and file modifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {stats.recent_commits.slice(0, 10).map((commit) => (
                  <div key={commit.sha} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{commit.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {commit.author} • {format(new Date(commit.date), 'MMM dd, HH:mm')}
                        </p>
                      </div>
                      <div className="flex gap-2 text-xs">
                        <Badge variant="outline">{commit.files_changed} files</Badge>
                        <Badge variant="outline" className="text-green-600">+{commit.additions}</Badge>
                        <Badge variant="outline" className="text-red-600">-{commit.deletions}</Badge>
                      </div>
                    </div>
                    {commit.files.length > 0 && (
                      <div className="mt-2 text-xs text-gray-600">
                        Files: {commit.files.slice(0, 3).map(f => f.filename).join(', ')}
                        {commit.files.length > 3 && ` +${commit.files.length - 3} more`}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 